---
title: Ubuntu 快速安裝 Docker & Docker Compose
date: 2026-02-05
tags:
  - Docker
  - Ubuntu
  - Linux
  - DevOps
categories:
  - DevOps
description: 懶人包教學：在 Ubuntu 上使用官方腳本快速安裝 Docker，並透過 apt 安裝 Docker Compose。
---

# {{ $frontmatter.title }}

這是一篇快速筆記，記錄如何在 Ubuntu 系統上以最快速度安裝 Docker Engine 和 Docker Compose。

## Step 1: 安裝 Docker

使用官方提供的便利腳本 (Convenience Script) 進行安裝，這會自動處理 GPG key 和 Repository 的設定。

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## Step 2: 設定使用者權限

預設情況下，執行 `docker` 指令需要 `sudo` 權限。為了方便使用，建議將目前的使用者加入 `docker` 群組。

### 1. 確認 Docker 群組

通常安裝 Docker 時會自動建立此群組。您可以執行以下指令確認：

```bash
cat /etc/group | grep docker
```

如果沒有看到相關輸出，請手動建立：

```bash
sudo groupadd docker
```

### 2. 將使用者加入群組

將您的使用者帳號 (username) 加入 `docker` 群組：

```bash
sudo usermod -aG docker $USER
```

### 3. 套用變更 (刷新群組)

要讓設定生效，通常需要登出再登入。但推薦使用以下**最快的解決方法**，直接在當前終端機刷新群組：

```bash
newgrp docker
```

這個指令會強制目前的 Shell 重新登入並載入 docker 群組。執行後，請再次嘗試執行 `docker ps` 看是否正常，如果正常顯示且無權限錯誤，即代表設定成功。

> 若不使用 `newgrp`，則必須**登出再重新登入** (Log out & Log in) 才會生效。

重新登入後，可以測試是否能不加 sudo 執行：

```bash
docker run hello-world
```

## Step 3: 安裝 Docker Compose

雖然上面的安裝腳本通常會包含 Compose Plugin，但如果你需要手動透過 `apt` 安裝或更新 Docker Compose，可以使用以下指令：

```bash
sudo apt update
sudo apt install docker-compose-plugin
```

安裝完成後，檢查版本：

```bash
docker compose version
```

> **注意**：現在推薦使用的是 `docker compose` (v2, 透過 plugin)，而不是舊版的 `docker-compose` (v1)。上述指令安裝的是新版 Plugin。

## 常用指令速查

```bash
# 啟動 Docker 服務
sudo service docker start

# 設定開機自動啟動
sudo systemctl enable docker

# 停止容器
docker stop <container_id>

# 刪除所有停止的容器
docker container prune
```
