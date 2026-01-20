---
title: "Atuin"
description: "Magical shell history manager. Replaces shell history with SQLite database, with encrypted sync and full-screen search UI."
version: "18.11.0"
pubDate: 2026-01-20
rating: 5.0
tags: ["shell-history", "sync", "encryption"]
repoUrl: "https://github.com/atuinsh/atuin"
downloadUrl: "https://atuin.sh/"
icon: "📜"
---

# Atuin

神奇的 Shell 历史管理工具

## Features

将传统 Shell 历史替换为 SQLite 数据库，记录命令的额外上下文（退出码、持续时间、工作目录、主机名等）。提供可选的端到端加密同步功能，实现跨机器历史记录同步。

重新绑定 `ctrl-r` 和 `up` 键到全屏搜索 UI，支持快速跳转（Alt-<num>）、多种过滤模式（会话、目录、全局），以及统计功能（最常用命令等）。

## Rating

Shell 历史管理的革命性工具。端到端加密确保隐私安全，SQLite 数据库提供强大查询能力，全屏搜索体验流畅。多设备同步后，再也找不到命令的日子一去不返。

## Installation

### 推荐安装方式

```bash
curl --proto '=https' --tlsv1.2 -LsSf https://setup.atuin.sh | sh
```

### 包管理器

```bash
# Homebrew (macOS)
brew install atuin

# MacPorts
sudo port install atuin

# Cargo
cargo install atuin

# Nix
nix-env -f '<nixpkgs>' -iA atuin

# Arch Linux
pacman -S atuin

# Void Linux
sudo xbps-install atuin

# Termux
pkg install atuin
```

## Usage

### 初始化配置

```bash
# 注册账号（使用 Atuin Cloud 服务器，端到端加密）
atuin register -u <USERNAME> -e <EMAIL>

# 导入现有历史
atuin import auto

# 同步历史
atuin sync
```

重启 Shell 后生效。

### 搜索历史

按 `ctrl-r` 打开全屏搜索界面：

| 快捷键 | 功能 |
|--------|------|
| `ctrl-r` | 切换搜索模式（全局/会话/目录） |
| `ctrl-e` | 编辑选中的命令 |
| `tab` | 编辑选中的命令 |
| `enter` | 执行选中的命令 |
| `Alt-<num>` | 快速跳转到列表项 |

### 常用命令

```bash
# 搜索历史
atuin search docker

# 按退出码搜索（只找成功的命令）
atuin search --exit 0 make

# 按时间搜索
atuin search --after "yesterday 3pm" --before "today 9am"

# 搜索特定目录的历史
atuin search --cwd /path/to/project

# 显示使用统计
atuin stats

# 同步历史
atuin sync

# 导入现有历史
atuin import zsh   # 导入 zsh 历史
atuin import bash   # 导入 bash 历史
atuin import auto    # 自动检测并导入
```

## Advanced Features

### 搜索模式

Atuin 支持多种搜索模式，通过 `ctrl-r` 切换：

- **全局模式**：搜索所有历史记录（默认）
- **会话模式**：只搜索当前 Shell 会话的历史
- **目录模式**：只搜索当前工作目录的历史

在配置文件中设置默认模式：

```toml
# ~/.config/atuin/config.toml
[search]
mode = "fuzzy"  # options: prefix, fulltext, fuzzy, skim
```

### 统计功能

```bash
# 显示最常用的命令
atuin stats

# 最常使用的命令前 10 个
atuin stats --count 10

# 显示最常使用的前 10 个命令
atuin stats --count 10
```

### 过滤选项

```bash
# 按退出码过滤（0 = 成功）
atuin search --exit 0

# 按时间范围过滤
atuin search --after "2024-01-01" --before "2024-12-31"

# 按主机名过滤
atuin search --hostname my-server

# 按会话过滤
atuin search --session <session-id>

# 排除某些命令
atuin search --exclude ls,cd
```

## Configuration

### 配置文件位置

```
~/.config/atuin/config.toml
~/.local/share/atuin/history.db
~/.local/share/atuin/key
~/.local/share/atuin/session
```

可通过环境变量 `ATUIN_CONFIG_DIR` 覆盖配置目录。

### 常用配置选项

```toml
# ~/.config/atuin/config.toml

# 数据库路径
db_path = "~/.local/share/atuin/history.db"

# 加密密钥路径
key_path = "~/.local/share/atuin/key"

# 会话文件路径（API token）
session_path = "~/.local/share/atuin/session"

# 日期格式（us 或 uk）
dialect = "us"

# 自动同步（登录后）
auto_sync = true

# 同步频率（0 = 每条命令后同步，1h = 每小时）
sync_frequency = "1h"

# 同步服务器地址
sync_address = "https://api.atuin.sh"

# 搜索模式（prefix, fulltext, fuzzy, skim）
search_mode = "fuzzy"

# 检查更新
update_check = true
```

### Shell 集成

#### Zsh

```zsh
# ~/.zshrc
eval "$(atuin init zsh)"
```

#### Bash

```bash
# ~/.bashrc
eval "$(atuin init bash)"
```

**注意**：Bash 使用 `bash-preexec` 提供必要的钩子，但该工具有一些限制。详见官方文档。

#### Fish

```fish
# ~/.config/fish/config.fish
atuin init fish | source
```

#### Nushell

```nu
# ~/.config/nushell/config.nu
source ~/.atuin/init.nu
```

## Security

### 端到端加密

Atuin 的同步功能采用端到端加密：
- 所有历史记录在发送到服务器前已加密
- 服务器无法访问你的数据
- 加密密钥存储在本地（`~/.local/share/atuin/key`）
- 即使服务器被入侵，你的数据仍然是安全的

### 自托管服务器

你也可以自建同步服务器：

```bash
# 使用 Docker 部署
docker run -d -p 8888:8888 \
  -v /path/to/data:/data \
  ghcr.io/atuinsh/atuin-server:latest
```

然后修改配置：

```toml
sync_address = "https://your-server.com"
```

### 仅本地模式

如果不使用同步，Atuin 仍然可以作为本地历史管理工具使用：

```bash
# 不注册，仅使用本地功能
atuin import auto
```

## Tips

1. **导入现有历史**：首次安装时运行 `atuin import auto`，保留所有历史
2. **快捷键记忆**：`ctrl-r` 切换搜索模式，`Alt-<num>` 快速跳转
3. **同步频率**：默认每小时同步，可设置为 `0` 实时同步（注意速率限制）
4. **多终端历史**：所有终端和会话共享同一个历史数据库
5. **备份数据库**：SQLite 数据库可随时备份，恢复时直接替换文件即可
6. **搜索模式**：尝试不同的搜索模式（fuzzy/skim/prefix），找到最适合你的

## Comparison

| 特性 | 传统 Shell 历史命令 | Atuin |
|--------|---------------------|--------|
| 存储 | 文本文件 | SQLite 数据库 |
| 搜索 | `history \| grep` | 全屏模糊搜索 UI |
| 跨设备 | 无 | 端到端加密同步 |
| 上下文 | 无 | 退出码、持续时间、目录、主机名等 |
| 统计 | 无 | 最常用命令、使用统计 |
| 多终端 | 独立历史 | 共享历史 |

## Links

- [官方网站](https://atuin.sh/)
- [官方文档](https://docs.atuin.sh/)
- [GitHub 仓库](https://github.com/atuinsh/atuin)
- [社区论坛](https://forum.atuin.sh/)
- [Discord](https://discord.gg/jR3tfchVvW)
