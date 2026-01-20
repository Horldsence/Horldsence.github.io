---
title: "Espanso"
description: "A privacy-first, cross-platform text expander. Type shortcuts and expand them into full text with dynamic matches, forms, and shell commands."
version: "2.3.0"
pubDate: 2026-01-20
rating: 4.5
tags: ["text-expander", "automation", "input"]
repoUrl: "https://github.com/espanso/espanso"
downloadUrl: "https://espanso.org/install/"
icon: "⚡"
---

# Espanso

跨平台文本扩展工具，提升输入效率

## Features

隐私优先的文本扩展工具，运行在 Linux、macOS 和 Windows 上。

输入快捷键（触发词），自动展开为预设的文本或动态内容。支持变量、表单、Shell 命令、应用特定配置等高级功能。Espanso Hub 提供丰富的扩展包，可直接安装使用。

## Rating

文本扩展的 Rust 实现佳作。配置灵活，功能强大，跨平台支持完善。对于需要频繁输入重复文本的用户（开发者、客服、行政等）是必备工具。

## Installation

### Linux (推荐使用 DEB 包)

```bash
# 下载 DEB 包
wget https://github.com/espanso/espanso/releases/latest/download/espanso-debian-x11-amd64.deb

# 安装
sudo apt install ./espanso-debian-x11-amd64.deb

# 注册并启动服务
espanso service register
espanso start
```

### macOS

从 [espanso.org/install/](https://espanso.org/install/) 下载安装包，拖拽到应用程序文件夹。首次启动可能需要授权辅助功能权限。

### Windows

从 [espanso.org/install/](https://espanso.org/install/) 下载 .exe 安装程序，按照向导完成安装。

## Configuration

### 配置文件位置

- **Linux**: `$XDG_CONFIG_HOME/espanso`（默认 `~/.config/espanso`）
- **Windows**: `%APPDATA%\espanso`（默认 `C:\Users\用户名\AppData\Roaming\espanso`）
- **macOS**: `$HOME/Library/Application Support/espanso`

### 目录结构

```
espanso/
├── config/
│   ├── default.yml         # 全局配置
│   ├── vscode.yml          # 应用特定配置
│   ├── telegram.yml
│   └── ...
├── match/
│   ├── base.yml            # 自定义匹配规则
│   ├── coding.yml
│   └── ...
├── packages/               # 安装的扩展包
└── _global_vars.yml        # 全局变量
```

## Usage

### 基础匹配

在 `match/base.yml` 中定义匹配规则：

```yaml
matches:
  - trigger: ":hello"
    replace: "你好，世界！"

  - trigger: ":email"
    replace: "user@example.com"

  - trigger: ":addr"
    replace: "北京市朝阳区xxx街道xxx号"
```

输入 `:hello` + 空格，自动展开为 `你好，世界！`

### 动态匹配

#### 日期时间

```yaml
matches:
  - trigger: ":date"
    replace: "{{mydate}}"
    vars:
      - name: mydate
        type: date
        params:
          format: "%Y-%m-%d"

  - trigger: ":time"
    replace: "{{mytime}}"
    vars:
      - name: mytime
        type: date
        params:
          format: "%H:%M:%S"

  - trigger: ":tomorrow"
    replace: "{{date}}"
    vars:
      - name: date
        type: date
        params:
          format: "%Y-%m-%d"
          offset: 86400  # 24小时后的日期

  # 时区转换（v2.3.0+）
  - trigger: ":nyc"
    replace: "{{time}}"
    vars:
      - name: time
        type: date
        params:
          format: "%H:%M"
          tz: "America/New_York"
```

#### Shell 命令

```yaml
matches:
  - trigger: ":ip"
    replace: "我的 IP 是: {{ip}}"
    vars:
      - name: ip
        type: shell
        params:
          cmd: "curl -s ifconfig.me"

  - trigger: ":uuid"
    replace: "{{uuid}}"
    vars:
      - name: uuid
        type: shell
        params:
          cmd: "uuidgen"
```

#### 随机选择

```yaml
matches:
  - trigger: ":quote"
    replace: "{{output}}"
    vars:
      - name: output
        type: choice
        params:
          values:
            - "每一个瞬间都是新的开始。"
            - "你能想象的一切都是真实的。"
            - "无论做什么，都要做到最好。"
```

### 表单（Forms）

创建交互式模板，支持用户输入：

```yaml
matches:
  - trigger: ":email"
    form: |
      收件人: [[recipient]]
      主题: [[subject]]

      [[body]]

    form_fields:
      recipient:
        type: text
      subject:
        type: text
      body:
        type: text
        multiline: true
```

### 全局变量

在 `_global_vars.yml` 中定义可重用的变量：

```yaml
global_vars:
  - name: company
    type: echo
    params:
      echo: "ABC科技有限公司"

  - name: phone
    type: echo
    params:
      echo: "+86 138-0000-0000"
```

在匹配中使用：

```yaml
matches:
  - trigger: ":sig"
    replace: |
      ---
      {{company}}
      电话: {{phone}}
```

### 应用特定配置

在特定应用中启用/禁用或自定义匹配：

```yaml
# config/vscode.yml - 仅在 VSCode 中生效
filter_exec: "Code"

matches:
  - trigger: ":print"
    replace: "console.log('{{cursor}}');"
```

```yaml
# config/telegram.yml - 在 Telegram 中禁用 Espanso
filter_title: "Telegram"
enable: false
```

过滤类型：
- `filter_exec`: 匹配可执行文件路径（正则表达式）
- `filter_title`: 匹配窗口标题（字符串匹配）
- `filter_class`: 匹配窗口类（正则表达式）
- `filter_os`: 按操作系统过滤（Linux/macOS/Windows）

## Packages

Espanso Hub 提供丰富的扩展包，可直接安装：

```bash
# 安装扩展包
espanso install <package_name>

# 安装特定版本
espanso install <package_name> --version 0.1.0

# 更新所有包
espanso package update all

# 列出已安装的包
espanso package list

# 卸载包
espanso uninstall <package_name>
```

访问 [Espanso Hub](https://hub.espanso.org) 浏览可用扩展包。

## Advanced Features

### 匹配属性

```yaml
matches:
  - trigger: ":js"
    replace: "JavaScript"
    word: true  # 仅作为完整单词触发（如 "abc:js" 不触发）

  - trigger: ":test"
    replace: "Test"
    propagate_case: true  # 保持大小写（":TEST" → "TEST"）

  - trigger: ":code"
    replace: "{{code}}"
    left_word: true  # 左侧必须有单词边界
```

### 后端选择

```yaml
# config/default.yml
backend: Auto          # 自动选择（推荐）
# backend: Clipboard  # 强制使用剪贴板（适用于长文本）
# backend: Inject     # 强制使用注入（最快，但需要权限）

clipboard_threshold: 100  # 超过 100 字符使用剪贴板
```

### 配置选项

```yaml
# config/default.yml
toggle_key: ALT         # 切换 Espanso 的快捷键（CTRL/SHIFT/ALT）
auto_restart: true     # 配置文件变化时自动重启
enable: true           # 是否启用 Espanso
max_regex_buffer_size: 30  # 正则表达式缓冲区大小（字符）
```

### 常用示例

#### 开发相关

```yaml
# match/coding.yml
matches:
  - trigger: ":cl"
    replace: "console.log('{{cursor}}');"

  - trigger: ":py"
    replace: "print('{{cursor}}')"

  - trigger: ":fori"
    replace: "for (let i = 0; i < n; i++) { {{cursor}} }"

  - trigger: ":if"
    replace: "if ({{condition}}) { {{cursor}} }"
```

#### 邮件模板

```yaml
matches:
  - trigger: ":meeting"
    form: |
      主题: [[subject]]
      时间: [[time]]
      地点: [[location]]
      参会人: [[attendees]]

      ---
      会议议程:
      1. [[agenda1]]
      2. [[agenda2]]
```

#### 表情符号

```yaml
matches:
  - trigger: ":smile"
    replace: "😊"

  - trigger: ":check"
    replace: "✅"

  - trigger: ":star"
    replace: "⭐"
```

## Tips

1. **启用自动重启**：配置 `auto_restart: true`，修改配置后无需手动重启
2. **使用包管理**：从 Espanso Hub 安装常用扩展包，避免重复造轮子
3. **分类组织**：将匹配规则按类别（coding.yml, email.yml 等）组织到不同文件
4. **应用特定配置**：为不同应用创建独立配置，避免冲突
5. **调试模式**：运行 `espanso log` 查看实时日志，排查问题

## Links

- [官方文档](https://espanso.org/docs/)
- [Espanso Hub](https://hub.espanso.org)
- [GitHub 仓库](https://github.com/espanso/espanso)
- [安装指南](https://espanso.org/docs/install/)
