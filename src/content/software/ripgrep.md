---
title: "Ripgrep"
description: "A fast, line-oriented search tool that recursively searches directories. Respects gitignore, skips binaries, and written in Rust."
version: "14.1.1"
pubDate: 2026-01-20
rating: 5.0
tags: ["search", "grep", "cli-tool", "terminal", "developer-tools", "productivity", "rust", "regex"]
repoUrl: "https://github.com/BurntSushi/ripgrep"
downloadUrl: "https://github.com/BurntSushi/ripgrep/releases"
icon: "🔎"
---

# Ripgrep (rg)

极快的代码搜索工具，grep 的现代替代品

## Features

用 Rust 编写的命令行搜索工具，递归搜索当前目录中的正则表达式模式。默认遵循 `.gitignore` 规则，自动跳过隐藏文件和二进制文件。

采用并行目录遍历、SIMD 优化、内存映射等技术，性能远超 grep、ag、ack 等传统工具。在 Linux 内核搜索测试中，速度比 git grep 快 3 倍，比 GNU grep 快 32 倍。

## Rating

代码搜索的黄金标准。速度快、默认配置合理、功能全面。已完全替代传统 grep，是开发者必备工具。

## Installation

### macOS
```bash
brew install ripgrep
```

### Linux
```bash
# Arch Linux
sudo pacman -S ripgrep

# Fedora/RHEL/CentOS
sudo dnf install ripgrep

# Debian/Ubuntu
sudo apt-get install ripgrep

# openSUSE
sudo zypper install ripgrep
```

### Windows
```powershell
# Chocolatey
choco install ripgrep

# Scoop
scoop install ripgrep

# Winget
winget install BurntSushi.ripgrep.MSVC
```

### 其他平台
```bash
# FreeBSD
sudo pkg install ripgrep

# Nix
nix-env --install ripgrep

# Cargo
cargo install ripgrep

# Cargo binstall（更快，直接下载二进制）
cargo binstall ripgrep
```

### 预编译二进制文件

从 [GitHub Releases](https://github.com/BurntSushi/ripgrep/releases) 下载，Linux 和 Windows 版本是静态可执行文件，无需依赖。

## Usage

### 基础搜索

```bash
# 递归搜索当前目录
rg pattern

# 搜索特定文件
rg pattern README.md

# 不区分大小写
rg -i pattern

# 单词边界匹配
rg -w pattern

# 显示上下文（前后各 2 行）
rg -C 2 pattern

# 只显示文件名，不显示匹配内容
rg -l pattern

# 显示每个文件的匹配次数
rg -c pattern
```

### 正则表达式

```bash
# 字符类匹配
rg '[A-Z]+_SUSPEND'

# "fast" 后跟单词字符
rg 'fast\w+'

# 固定字符串（字面量）匹配
rg -F 'function('

# 多个模式
rg -e 'error' -e 'warning'
```

### 文件类型过滤

```bash
# 只搜索 Python 文件
rg -tpy 'def.*function'

# 排除 JavaScript 文件
rg -Tjs pattern

# 列出所有支持的文件类型
rg --type-list

# 添加自定义文件类型
rg --type-add 'web:*.{html,css,js}' -tweb title
```

内置类型包括：`rust`, `py`, `js`, `c`, `cpp`, `java`, `go`, `rs`, `sh`, `sql`, `yaml`, `json`, `xml`, `toml`, `css`, `html`, `md`, `bat`, `make` 等。

### Glob 模式过滤

```bash
# 只搜索 *.toml 文件
rg -g '*.toml' clap

# 排除所有 *.toml 文件
rg -g '!*.toml' clap

# 多个 glob 模式（后面的覆盖前面的）
rg -g '!*.toml' -g 'Cargo.toml' clap  # 只搜索 Cargo.toml
```

## Advanced Features

### 自动过滤

默认情况下，ripgrep 忽略：
- 匹配 `.gitignore`、`.ignore`、`.rgignore` 的文件
- 隐藏文件和目录
- 二进制文件（包含 NUL 字节的文件）
- 符号链接

**覆盖过滤规则**：

```bash
# 禁用所有忽略规则
rg --no-ignore pattern

# 搜索隐藏文件
rg --hidden pattern

# 搜索二进制文件
rg --text pattern  # 或 -a

# 无限制模式（禁用所有过滤）
rg -uuu pattern
# -u  = 禁用 gitignore
# -uu = +隐藏文件
# -uuu = +二进制文件
```

### 多行搜索

```bash
# 跨多行搜索
rg -U 'pattern.*on.*multiple.*lines'

# 多行 + PCRE2（支持预查、反向引用）
rg -P -U '(?<=error)\s+\w+'
```

### 压缩文件搜索

```bash
# 搜索压缩文件（gzip, bzip2, lz4, lzma, xz, zstandard, brotli）
rg -z pattern

# 等同于 xzgrep, xzegrep, xzfgrep 别名
```

### 文件编码

```bash
# 自动检测（默认）
rg pattern

# 特定编码
rg --encoding utf-16le pattern

# 禁用编码（原始字节）
rg --encoding none pattern
```

支持的编码包括：UTF-8, UTF-16 (LE/BE), latin-1, GBK, EUC-JP, Shift_JIS 等。

### 替换匹配文本

```bash
# 替换为指定文本
rg 'fast' README.md --replace FAST

# 或使用 -r 标志
rg 'fast' README.md -r FAST
```

### JSON 输出

```bash
# JSON 格式输出（用于程序化处理或与 delta 等工具集成）
rg --json pattern
```

## Configuration

### 配置文件

ripgrep 使用 `.ripgreprc` 配置文件（不是 `ripgrep.toml`）。通过 `RIPGREP_CONFIG_PATH` 环境变量指定路径。

**配置规则**：
1. 每行是一个 shell 参数（去除前后空白）
2. 以 `#` 开头的行（前面可选空白）被忽略
3. 无需转义，每行原样传递

**示例 `.ripgreprc`**：

```bash
# 限制显示长行，启用预览
--max-columns=150
--max-columns-preview

# 添加自定义 'web' 文件类型
--type-add
web:*.{html,css,js}*

# 默认搜索隐藏文件
--hidden

# 排除文件/文件夹
--glob=!.git/*

# 设置颜色
--colors=line:none
--colors=line:style:bold

# 智能大小写（模式无大写时不区分大小写）
--smart-case
```

**标志/值语法**：

```bash
# 两者等价：
--max-columns=150
--max-columns
150
```

### 常用别名

```bash
# 大小写不敏感
alias rgi='rg -i'

# 列出包含匹配的文件
alias rgl='rg -l'

# 反向匹配
alias rgv='rg -v'

# 智能大小写 + delta 高亮
rgd() { rg --json "$@" | delta; }
```

## Performance

### 性能优势

**Linux 内核搜索测试（536 个匹配）**：

| 工具 | 命令 | 时间 |
|------|------|------|
| ripgrep (Unicode) | `rg -n -w '[A-Z]+_SUSPEND'` | **0.082s** (1.00x) |
| git grep | `git grep -P -n -w '[A-Z]+_SUSPEND'` | 0.273s (3.34x) |
| The Silver Searcher | `ag -w '[A-Z]+_SUSPEND'` | 0.443s (5.43x) |
| GNU grep | `LC_ALL=en_US.UTF-8 grep -E -n -w '[A-Z]+_SUSPEND'` | 2.670s (32.70x) |

### 性能优化技术

- **并行目录遍历**：无锁并行递归目录迭代器
- **SIMD 优化**：利用 CPU SIMD 指令加速搜索
- **内存映射**：自动选择内存映射或增量缓冲
- **RegexSet 优化**：同时匹配多个 glob 模式
- **DFA 有限自动机**：基于 Rust 的 regex 引擎

### 性能优化建议

1. **使用 `--smart-case`**：模式无大写时不区分大小写
2. **使用文件类型（`-t`）**：避免重复的 glob 模式
3. **限制搜索范围**：指定具体目录路径
4. **启用内存映射**：ripgrep 自动选择最优方式（`--mmap` 是默认值）
5. **大模式文件增加 DFA 缓存**：`--dfa-size-limit 1G`
6. **避免 PCRE2 除非必要**：默认正则引擎更快
7. **使用 `--pre-glob` 限制预处理器**：只对特定文件运行预处理

## Integration

### 与 fzf 集成

**交互式搜索**：

```bash
# fzf 作为选择器，ripgrep 搜索
RG_PREFIX="rg --column --line-number --no-heading --color=always --smart-case"

INITIAL_QUERY=""
FZF_DEFAULT_COMMAND="$RG_PREFIX ''" \
  fzf --ansi --disabled --query "$INITIAL_QUERY" \
      --bind "start:reload($RG_PREFIX {q})+unbind(ctrl-r)" \
      --bind "change:reload($RG_PREFIX {q} || true)" \
      --preview-window 'down:10%:wrap' \
      --preview "$RG_PREFIX --context {1} {q} || true" \
      --delimiter : \
      --nth 4.. \
      --height 80%
```

### 与 delta 集成（语法高亮分页器）

```bash
# 使用 delta 高亮显示搜索结果
rg --json -C 2 "pattern" | delta
```

### 与 bat 集成

ripgrep + fzf + bat = 即时代码搜索与预览。

### 实用脚本示例

**统计总匹配次数**：

```bash
rgcountsum() { rg --count "$@" | awk -F: '{sum += $2} END {print sum}'; }
```

**搜索并编辑**：

```bash
# 搜索并用 neovim 打开
alias frg='fzf --ansi --phony --prompt "🔍 rg > " \
  --bind "change:reload:bash -c '\''rg --glob \"*.log\" --ignore-case --line-number --no-heading --color=always {q} || true'\''" \
  --preview "bat --style=numbers --color=always --highlight-line {2} {1}" \
  --delimiter : \
  --bind "enter:execute(nvim {1} +{2})"'
```

## Tips

1. **利用自动过滤**：ripgrep 默认遵循 `.gitignore`，无需手动排除 node_modules 等
2. **配置文件**：将常用选项写入 `.ripgreprc`，提升效率
3. **文件类型优先**：使用 `-tpy` 而非 `-g '*.py'`，更清晰更高效
4. **智能大小写**：`--smart-case` 是默认行为，推荐保持
5. **禁用配置文件**：使用 `--no-config` 避免读取任何配置
6. **大模式文件**：使用 `--dfa-size-limit 1G` 提升 RegexSet 性能

## Links

- [官方仓库](https://github.com/BurntSushi/ripgrep)
- [用户指南](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md)
- [常见问题](https://github.com/BurntSushi/ripgrep/blob/master/FAQ.md)
- [交互式教程](https://codapi.org/try/ripgrep/)
- [正则语法](https://docs.rs/regex/1/regex/#syntax)
