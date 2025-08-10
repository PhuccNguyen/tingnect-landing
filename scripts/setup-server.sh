#!/bin/bash
set -e

echo "🔧 Starting TingNect server setup..."

# --- Variables ---
USER_NAME="tingnect"
PROJECT_DIR="/var/www/tingnect"

# --- Update system ---
echo "🔄 Updating packages..."
sudo apt update && sudo apt upgrade -y

# --- Install Docker ---
if ! command -v docker &> /dev/null; then
  echo "🐳 Installing Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
else
  echo "✅ Docker already installed"
fi

# --- Install Docker Compose ---
if ! command -v docker-compose &> /dev/null; then
  echo "📦 Installing Docker Compose..."
  sudo apt install -y docker-compose
else
  echo "✅ Docker Compose already installed"
fi

# --- Install Git ---
if ! command -v git &> /dev/null; then
  echo "📁 Installing Git..."
  sudo apt install -y git
else
  echo "✅ Git already installed"
fi

# --- Install Node.js (optional) ---
if ! command -v node &> /dev/null; then
  echo "🧩 Installing Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "✅ Node.js already installed"
fi

# --- Create deploy user ---
if id "$USER_NAME" &>/dev/null; then
  echo "👤 User '$USER_NAME' already exists"
else
  echo "👤 Creating user '$USER_NAME'..."
  sudo useradd -m -s /bin/bash "$USER_NAME"
  sudo usermod -aG docker "$USER_NAME"
fi

# --- Setup project directory ---
echo "📂 Setting up project directory..."
sudo mkdir -p "$PROJECT_DIR"
sudo chown "$USER_NAME:$USER_NAME" "$PROJECT_DIR"

echo ""
echo "✅ Server setup completed!"
echo "👉 Next steps:"
echo "   🔐 Switch user:     sudo su - $USER_NAME"
echo "   📂 Go to project:   cd $PROJECT_DIR"
echo "   📥 Clone repo:      git clone <your-repo-url> ."
