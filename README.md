# Retro Pixel Software Repository 💾

一个基于 Astro + Tailwind CSS 构建的复古像素风软件仓库/个人主页。

## ✨ 特性

- 🎨 **复古暖色调**: 米黄色背景 + 像素风 UI 元素
- 📱 **响应式设计**: 完美适配桌面和移动端
- 🏷️ **标签系统**: 支持多标签分类与筛选
- ⭐ **评分系统**: 支持 0-5 星评分与排序
- 💬 **评论功能**: 集成 Giscus (GitHub Discussions)
- 🛠️ **易于管理**: 通过 Markdown 文件轻松管理软件内容

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
# 或者
pnpm install
# 或者
yarn install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:4321` 查看效果。

### 3. 构建生产版本

```bash
npm run build
```

## 📝 如何添加软件

在 `src/content/software/` 目录下创建一个新的 `.md` 文件。

**示例文件结构:**

```markdown
---
title: "我的软件名称"
description: "这是一个非常棒的软件，它可以帮你做很多事情。"
version: "1.0.0"
pubDate: 2023-12-19
rating: 4.5             # 评分 (0-5)
tags: ["工具", "效率"]   # 标签
repoUrl: "https://github.com/username/repo"
downloadUrl: "https://github.com/username/repo/releases"
icon: "🚀"              # 可以是 Emoji 或图片路径
---

# 软件详细介绍

这里可以使用 **Markdown** 编写详细的软件说明。

- 特性 1
- 特性 2

![软件截图](https://example.com/screenshot.png)
```

## 🎨 中文字体支持

本项目默认配置了对像素字体的支持。为了获得最佳的中文像素体验，建议使用 **Zpix (最像素)** 或 **Cubic 11** 字体。

1.  下载字体文件 (例如 `Zpix.ttf`)。
    *   [Zpix 下载地址](https://github.com/SolidZORO/zpix-pixel-font)
2.  将字体文件放入 `public/fonts/` 目录（如果没有该目录请新建）。
3.  项目已预配置引用 `public/fonts/Zpix.ttf`。如果你使用其他字体，请修改 `src/styles/global.css` 中的 `@font-face` 配置。

## ⚙️ 配置

### 修改站点信息

编辑 `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://your-site.com',
  // ...
});
```

### 配置评论系统 (Giscus)

编辑 `src/components/CommentSection.astro`，替换以下配置：

```html
<script src="https://giscus.app/client.js"
    data-repo="[你的 GitHub 用户名]/[仓库名]"
    data-repo-id="[仓库 ID]"
    data-category="[分类名]"
    data-category-id="[分类 ID]"
    ...
>
```

## 📄 License

MIT
