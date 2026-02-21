# Ubuntu User Setup Guide

This guide covers the essential steps for setting up a new user on a fresh Ubuntu server.

## 0. Install SSH Server (If missing)

If your Ubuntu system doesn't have SSH installed, you can install the OpenSSH server with the following commands:

```bash
sudo apt update
sudo apt install openssh-server -y
```

After installation, ensure the service is running:

**Method 1: Using systemctl (Standard)**

```bash
sudo systemctl status ssh
sudo systemctl enable --now ssh
```

**Method 2: Using service (Docker / WSL / Non-systemd)**
If you see "System has not been booted with systemd", use this:

```bash
sudo service ssh status
sudo service ssh start
```

## 1. Create a New User

Use the `adduser` command to create a new user. This command will prompt you for a password and user information.

```bash
sudo adduser <username>
```

## 2. Grant Sudo Privileges

To allow the new user to execute commands with root privileges, add them to the `sudo` group.

```bash
sudo usermod -aG sudo <username>
```

## 3. Configure SSH Access

### Log in as the New User

Switch to the newly created user.

```bash
su - <username>
```

### SSH Method 1: Password Authentication (Common)

By default, Ubuntu allows password-based login for new users. If you prefer this method, you can skip adding SSH keys.

**Note:** Ensure you have set a strong password during the `adduser` step.

### SSH Method 2: Key-based Authentication (Optional)

If you also want to use SSH keys for better convenience/security:

#### Create SSH Directory

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

#### Add Your Public Key

Create or edit the `authorized_keys` file and paste your local public key into it.

```bash
nano ~/.ssh/authorized_keys
```

#### Set Correct Permissions

```bash
chmod 600 ~/.ssh/authorized_keys
```

## 4. Set Default Shell (Optional)

If you prefer using Zsh (and have it installed), you can change the default shell for the user.

```bash
sudo chsh -s /bin/zsh <username>
```

## 5. Basic Security Settings

### Ensure Password Authentication is Enabled

If you cannot log in with a password, ensure the following is set in `/etc/ssh/sshd_config`:

1. Edit the config:
   ```bash
   sudo nano /etc/ssh/sshd_config
   ```
2. Verify:
   ```conf
   PasswordAuthentication yes
   ```
3. Restart SSH:

   **Standard:**

   ```bash
   sudo systemctl restart ssh
   ```

   **Docker / WSL:**

   ```bash
   sudo service ssh restart
   ```

### Disable Root Login

It's a best practice to disable direct root login via SSH to force using your new user.

In `/etc/ssh/sshd_config`:

```conf
PermitRootLogin no
```

Then restart the SSH service:

**Standard:**

```bash
sudo systemctl restart ssh
```

**Docker / WSL:**

```bash
sudo service ssh restart
```
