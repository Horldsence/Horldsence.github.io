---
title: "fzf"
description: "A command-line fuzzy finder. Fast, portable, and integrates with Bash, Zsh, Fish, Vim, and Neovim for interactive list selection."
version: "0.56.3"
pubDate: 2026-01-20
rating: 5.0
tags: ["terminal", "fuzzy-finder", "productivity", "cli-tool", "shell-integration", "developer-tools", "search", "vim", "neovim"]
repoUrl: "https://github.com/junegunn/fzf"
downloadUrl: "https://github.com/junegunn/fzf/releases"
icon: "🔍"
---

# fzf

命令行模糊查找器，提升终端交互效率的神器

## Features

终端交互式模糊搜索工具。通过管道将任何列表（文件、历史记录、进程等）传递给 fzf，即可进行快速模糊匹配和选择。

内置 Shell 集成，支持 Bash/Zsh/Fish，可直接通过快捷键触发文件选择、历史记录搜索和目录跳转。完美集成 Vim/Neovim，支持预览、多选、自定义快捷键等高级功能。

## Rating

终端工具中的瑞士军刀。一旦用上就回不去的存在。配置灵活，性能卓越，是现代终端环境不可或缺的工具。

## Installation

### macOS
```bash
brew install fzf
```

### Linux
```bash
# Ubuntu/Debian
sudo apt install fzf

# Arch Linux
sudo pacman -S fzf

# Fedora
sudo dnf install fzf
```

### Windows
```powershell
# Chocolatey
choco install fzf

# Scoop
scoop install fzf

# Winget
winget install fzf
```

### 从源码安装
```bash
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

## Usage

### 基础用法

```bash
# 查找文件并编辑
vim $(fzf)

# 列出所有文件
find . -type f | fzf

# 从字典中选择单词
cat /usr/share/dict/words | fzf
```

### Shell 集成快捷键

启用 Shell 集成后（安装时已配置），可使用以下快捷键：

| 快捷键 | 功能 |
|--------|------|
| `CTRL-T` | 文件选择器，粘贴选中的文件路径 |
| `CTRL-R` | 历史记录搜索，粘贴选中的命令 |
| `ALT-C` | 目录选择器，cd 到选中的目录 |

### 模糊补全

在 Bash/Zsh 中，输入 `**` 后按 TAB 触发模糊补全：

```bash
# 搜索文件
vim **<TAB>

# 搜索目录
cd **<TAB>

# 搜索进程 ID
kill -9 **<TAB>
```

### 常用示例

```bash
# 搜索 Git 分支并切换
git checkout $(git branch | fzf)

# 搜索并删除 Docker 容器
docker rm $(docker ps -a | fzf | awk '{print $1}')

# 搜索 Tmux 会话并切换
tmux switch-client -t $(tmux ls | fzf | cut -d: -f1)

# 搜索进程并杀掉
kill -9 $(ps aux | fzf | awk '{print $2}')

# 搜索 Arch Linux 软件包并安装
pacman -Slq | fzf --multi --preview 'pacman -Si {1}' | xargs -ro sudo pacman -S
```

## Advanced Features

### 预览窗口

实时预览选中项的内容：

```bash
# 预览文件内容
fzf --preview 'cat {}'

# 使用 bat 高亮显示代码
fzf --preview 'bat --color=always {}'

# 右侧预览，宽度 60%
fzf --preview 'bat --color=always {}' --preview-window right:60%

# 隐藏预览，按 CTRL-/ 切换
fzf --preview-window hidden --bind 'ctrl-/:toggle-preview'
```

### 多选模式

```bash
# 启用多选模式
fzf --multi

# 使用 TAB 选择多个文件
fzf --multi

# 全选
fzf --multi --bind 'ctrl-a:select-all+accept'
```

### 自定义快捷键

```bash
# 复制选中内容到剪贴板
fzf --bind 'ctrl-y:execute-silent(echo {} | pbcopy)'

# 用默认程序打开文件
fzf --bind 'ctrl-o:execute-silent(open {})'

# 重新加载列表
fzf --bind 'ctrl-r:reload(find . -type f)'
```

### 搜索语法

在扩展搜索模式（默认）下：

| 语法 | 功能 | 示例 |
|------|------|------|
| `text` | 模糊匹配 | `sbtrkt` |
| `'text` | 精确匹配 | `'wild` |
| `^start` | 前缀精确 | `^music` |
| `end$` | 后缀精确 | `.mp3$` |
| `!text` | 反向匹配 | `!fire` |

### 与其他工具集成

#### Ripgrep 集成

```bash
# 搜索代码并预览
RG_PREFIX="rg --column --line-number --no-heading --color=always --smart-case"

INITIAL_QUERY=""
FZF_DEFAULT_COMMAND="$RG_PREFIX ''" \
  fzf --ansi --disabled --query "$INITIAL_QUERY" \
      --bind "start:reload($RG_PREFIX {q})+unbind(ctrl-r)" \
      --bind "change:reload($RG_PREFIX {q} || true)" \
      --bind 'ctrl-r:unbind(change)+reload($RG_PREFIX {q})' \
      --preview-window 'down:10%:wrap' \
      --preview "$RG_PREFIX --context {1} {q} || true" \
      --delimiter : \
      --nth 4.. \
      --height 80%
```

#### Bat 集成（语法高亮）

```bash
export FZF_CTRL_T_OPTS="
  --walker-skip .git,node_modules,target
  --preview 'bat -n --color=always {}'
  --bind 'ctrl-/:change-preview-window(down|hidden|)'"
```

#### fd 集成（快速文件查找）

```bash
export FZF_DEFAULT_COMMAND="fd --type f --hidden --strip-cwd-prefix --exclude .git"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
export FZF_ALT_C_COMMAND="fd --type=d --hidden --strip-cwd-prefix --exclude .git"
```

## Configuration

### 环境变量

```bash
# 默认查找命令（无输入时使用）
export FZF_DEFAULT_COMMAND='fd --type f'

# 全局选项（应用于所有 fzf 调用）
export FZF_DEFAULT_OPTS="--height 40% --layout reverse --border"

# 从文件加载选项
export FZF_DEFAULT_OPTS_FILE=~/.fzfrc
```

### 颜色主题

```bash
export FZF_DEFAULT_OPTS="
  --color fg:#bbccdd,bg:#334455,hl:#98c379
  --color fg+:#ddeeff,bg+:#223344,hl+:#98c379
  --color info:#blue,prompt:#cyan,pointer:#cyan
  --color marker:#cyan,spinner:#cyan
"
```

## Vim/Neovim 集成

### 安装

使用 vim-plug：

```vim
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
```

### 常用命令

```vim
:Files          " 查找文件
:Buffers        " 查找缓冲区
:History        " 命令历史
:Rg             " Ripgrep 搜索
:Lines          " 按行搜索
:Colors         " 颜色方案选择器
:Tags           " Git 标签
```

### 自定义函数

```vim
" 搜索文件并编辑
function! s:files() abort
  call fzf#run(fzf#wrap('files', {
        \ 'sink': 'e',
        \ 'options': '--reverse',
        \ 'down' : '40%'
        }))
endfunction
command! -bang FzfFiles call <SID>files()
```

## Tips

1. **启用 Shell 集成**：安装 fzf 时选择启用 Shell 集成，获得快捷键和自动补全
2. **配置预览**：使用 bat、tree 等工具增强预览体验
3. **使用 fd**：fd 比 find 更快，且自动遵循 .gitignore
4. **性能优化**：限制结果数量、使用更轻量的预览命令
5. **Tmux 模式**：在 tmux 中使用 `--tmux center,80%` 获得更好的布局

## Links

- [官方文档](https://junegunn.github.io/fzf/)
- [GitHub 仓库](https://github.com/junegunn/fzf)
- [高级用法](https://github.com/junegunn/fzf/blob/master/ADVANCED.md)
- [fzf.vim 插件](https://github.com/junegunn/fzf.vim)
