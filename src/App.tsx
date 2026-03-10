import { useState, useEffect, useRef } from 'react'
import './App.css'

type TimerMode = 'work' | 'shortBreak' | 'longBreak'

const MODES = {
  work: { time: 25 * 60, label: '专注', color: '#e74c3c' },
  shortBreak: { time: 5 * 60, label: '短休息', color: '#2ecc71' },
  longBreak: { time: 15 * 60, label: '长休息', color: '#3498db' }
}

function App() {
  const [mode, setMode] = useState<TimerMode>('work')
  const [timeLeft, setTimeLeft] = useState(MODES.work.time)
  const [isRunning, setIsRunning] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimerComplete()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const handleTimerComplete = () => {
    setIsRunning(false)
    if (mode === 'work') {
      setCompletedPomodoros((prev) => prev + 1)
      const newMode: TimerMode = completedPomodoros % 3 === 2 ? 'longBreak' : 'shortBreak'
      setMode(newMode)
      setTimeLeft(MODES[newMode].time)
    } else {
      setMode('work')
      setTimeLeft(MODES.work.time)
    }
  }

  const toggleTimer = () => {
    setIsRunning((prev) => !prev)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(MODES[mode].time)
  }

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false)
    setMode(newMode)
    setTimeLeft(MODES[newMode].time)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((MODES[mode].time - timeLeft) / MODES[mode].time) * 100
  const circumference = 2 * Math.PI * 140
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Pomodoro Timer</h1>
        
        <div className="mode-selector">
          {Object.entries(MODES).map(([key, value]) => (
            <button
              key={key}
              className={`mode-btn ${mode === key ? 'active' : ''}`}
              onClick={() => switchMode(key as TimerMode)}
              style={{ '--active-color': value.color } as React.CSSProperties}
            >
              {value.label}
            </button>
          ))}
        </div>

        <div className="timer-container">
          <svg className="progress-ring" width="320" height="320">
            <circle
              className="progress-ring__circle-bg"
              cx="160"
              cy="160"
              r="140"
            />
            <circle
              className="progress-ring__circle"
              cx="160"
              cy="160"
              r="140"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                stroke: MODES[mode].color
              }}
            />
          </svg>
          <div className="timer-display">
            <span className="time">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="controls">
          <button
            className={`control-btn ${isRunning ? 'pause' : 'start'}`}
            onClick={toggleTimer}
            style={{ '--btn-color': MODES[mode].color } as React.CSSProperties}
          >
            {isRunning ? '暂停' : '开始'}
          </button>
          <button className="control-btn reset" onClick={resetTimer}>
            重置
          </button>
        </div>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-value">{completedPomodoros}</span>
            <span className="stat-label">完成番茄</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
