---
title: Ubuntu Terminal 美化教學：zsh + oh-my-zsh + Powerlevel10k
date: 2026-02-04
tags:
  - Ubuntu
  - Linux
  - Terminal
  - zsh
  - oh-my-zsh
  - Powerlevel10k
categories:
  - DevOps
description: 手把手教學：如何在 Ubuntu 上安裝 zsh、oh-my-zsh 和 Powerlevel10k，打造美觀實用的 Terminal 環境。
---

# {{ $frontmatter.title }}

如果你在 Ubuntu 上進行開發，預設的 bash 雖然夠用，但 **zsh** 搭配 **oh-my-zsh** 和 **Powerlevel10k** 能提供更強大的自動補全、語法高亮和美觀的狀態列，大幅提升開發效率和爽度。

本文將帶你從零開始，在 Ubuntu 系統上打造最帥氣的 Terminal。

## Step 1: 安裝 zsh

Ubuntu 預設使用 bash，我們首先需要安裝 zsh。

更新套件列表並安裝 zsh：

```bash
sudo apt update
sudo apt install zsh -y
```

安裝完成後，檢查 zsh 版本確認安裝成功：

```bash
zsh --version
```

接著，將 zsh 設定為你的預設 Shell：

```bash
chsh -s $(which zsh)
```

> **注意**：設定完成後，需要登出並重新登入 (Log out & Log in) 才會生效。你可以輸入 `echo $SHELL` 來確認目前的 Shell 是否已變更為 `/usr/bin/zsh`。

## Step 2: 安裝 oh-my-zsh

**oh-my-zsh** 是管理 zsh 設定最強大的框架，它讓設定 zsh 變得超級簡單。

你可以使用 curl 或 wget 來安裝：

**使用 curl**

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**使用 wget**

```bash
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

安裝腳本執行完畢後，你的 Prompt 應該就會有些許改變，這代表 oh-my-zsh 已經生效了。

## Step 3: 安裝 Powerlevel10k 主題

[Powerlevel10k](https://github.com/romkatv/powerlevel10k) 是目前最受歡迎的 zsh 主題，速度快、設定容易且功能強大。

### 3-1. 下載 Powerlevel10k

將 Powerlevel10k clone 到 oh-my-zsh 的 custom themes 目錄中：

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

### 3-2. 啟用 Powerlevel10k

接著我們需要編輯 `~/.zshrc` 檔案來啟用這個主題。

```bash
nano ~/.zshrc
```

找到 `ZSH_THEME` 這一行，將它修改為：

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

按下 `Ctrl + X`，然後按 `Y` 和 `Enter` 存檔離開。

## Step 4: 設定字型 (重要！)

Powerlevel10k 使用很多特殊的圖示 (icons) 來顯示 Git 狀態、執行時間等資訊。為了正常顯示這些圖示，強烈建議安裝推薦的字型 **MesloLGS NF**。

### 手動安裝 (推薦)

1.  下載以下四個字型檔：
    - [MesloLGS NF Regular.ttf](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf)
    - [MesloLGS NF Bold.ttf](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold.ttf)
    - [MesloLGS NF Italic.ttf](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Italic.ttf)
    - [MesloLGS NF Bold Italic.ttf](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold%20Italic.ttf)
2.  點擊兩下這些 `.ttf` 檔案並點選「安裝 (Install)」。
3.  **設定 Terminal 字型**：
    - 打開 Ubuntu 的 Terminal。
    - 右鍵點選偏好設定 (Preferences)。
    - 選擇你的 Profile (通常是 Unnamed 或 Default)。
    - 勾選 "Custom font" (自訂字型)。
    - 搜尋並選擇 `MesloLGS NF Regular`。

### 針對無 GUI (Headless) 或遠端連線的使用者

如果你是這台 Ubuntu 機器是伺服器，你是透過 SSH 連線：

1.  **字型安裝在「本地端」**：
    你 **不需要** 在 Ubuntu 伺服器上安裝字型。請將 **MesloLGS NF** 字型安裝在你 **目前操作的電腦** (例如你的 Mac 或 Windows PC) 上，並設定你的 Terminal 軟體 (如 iTerm2, Windows Terminal, PuTTY, VS Code) 使用該字型。

2.  **純文字介面 (TTY) / Web Console**：
    如果你是直接看著伺服器螢幕 (TTY) 或使用雲端平台的 Web Console，這些環境通常不支援特殊圖示。
    - 建議在 `p10k configure` 時選擇 **Classic** 或 **Lean** 風格。
    - 字元集選擇 **ASCII**。
      這樣即使沒有特殊字型，Prompt 可以在純文字環境下正常顯示，不會出現亂碼。

## Step 5: 初始化 Powerlevel10k 設定

現在，重啟你的 Terminal，或者執行以下指令來套用新的 `.zshrc` 設定：

```bash
exec zsh
```

這時候 Powerlevel10k 應該會自動啟動設定精靈 (Configuration Wizard)。如果沒有自動跳出，可以手動執行：

```bash
p10k configure
```

### 設定流程

設定精靈會問你一系列問題來客製化你的 Prompt：

1.  **確認圖示**：會顯示鑽石、鎖頭等符號，確認你是否看得到。如果你已經正確安裝並設定了 MesloLGS NF 字型，這裡選 `y` (Yes)。
2.  **風格選擇**：選擇你喜歡的風格 (Lean, Classic, Rainbow, Pure)。這裡大推 **Rainbow**，看起來最現代。
3.  **字元集**：選擇 **Unicode** 以支援更多圖示。
4.  **顯示時間**：依喜好選擇 (No, 12hr, 24hr)。
5.  **分隔符號**：選擇 Prompt 區塊的分隔樣式 (Angled, Vertical, Rounded 等)。
6.  **Prompt 行數**：選擇 **One line** (單行) 或 **Two lines** (雙行)。雙行模式在路徑很長時特別好用。

設定完成後，你會得到一個既美觀又實用的 Terminal 環境！

## 進階技巧：好用的 Plugins

oh-my-zsh 還有很多強大的插件，這裡推薦兩個必裝的神器：

### 1. zsh-autosuggestions (自動建議)

當你輸入指令時，會根據歷史紀錄自動顯示建議 (淺灰色字體)，按右鍵或 `End` 即可補全。

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 2. zsh-syntax-highlighting (語法高亮)

讓你的指令有不同顏色，例如正確指令是綠色，錯誤指令是紅色。

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 啟用插件

編輯 `~/.zshrc`：

```bash
nano ~/.zshrc
```

找到 `plugins=(git)` 這一行，修改為：

```bash
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

重啟 zsh 即可生效：

```bash
source ~/.zshrc
```

## 結語

現在你的 Ubuntu Terminal 已經脫胎換骨了！不僅看起來賞心悅目，透過強大的自動補全和提示，開發效率也會顯著提升。Enjoy your new terminal!
