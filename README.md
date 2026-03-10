# Pomodoro Timer

一个简洁、现代化的番茄工作法计时器应用，使用 React + TypeScript + Vite 构建。

## 功能特性

- 三种计时模式：专注（25分钟）、短休息（5分钟）、长休息（15分钟）
- 圆形进度条显示剩余时间
- 自动切换模式（完成4个番茄后进入长休息）
- 完成番茄数统计
- 响应式设计，支持移动端
- 现代化UI界面，流畅的动画效果

## 技术栈

- React 18
- TypeScript
- Vite
- CSS3

## 本地开发

```bash
npm install
npm run dev
```

访问 `http://localhost:3000` 查看应用

## 构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录

## 部署

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 部署步骤：

1. 将代码推送到 GitHub 仓库
2. 在 GitHub 仓库设置中：
   - 进入 `Settings` -> `Pages`
   - 在 `Build and deployment` 下，选择 `Source` 为 `GitHub Actions`
3. 推送代码到 `main` 分支，GitHub Actions 会自动构建并部署

### 手动部署：

你也可以手动触发部署：
1. 进入 GitHub 仓库的 `Actions` 标签
2. 选择 `Deploy to GitHub Pages` workflow
3. 点击 `Run workflow` 按钮

## 项目结构

```
Pomodoro/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 部署配置
├── src/
│   ├── App.tsx             # 主应用组件
│   ├── App.css             # 应用样式
│   ├── main.tsx            # 应用入口
│   ├── index.css           # 全局样式
│   └── vite-env.d.ts       # TypeScript 类型声明
├── index.html              # HTML 模板
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目依赖
```

## 许可证

MIT License
