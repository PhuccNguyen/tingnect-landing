🚀 TingNect – Build for Billions
TingNect is a next-generation platform that connects developers, founders, investors, and tech leaders to collaboratively shape a sustainable Web3 future for billions of users.

🌐 Live Websites
Domain	Purpose
tingnect.com	Main website – project overview, ecosystem, and navigation hub.
event.tingnect.com	Event landing page – full agenda, speakers, sponsors, and event details.
lu.ma/tingnect	Event registration form powered by Lu.ma with real-time Telegram & Google Sheets integration.

🏗️ Project Structure
tingnect-landing/
├── src/
│   ├── app/
│   │   ├── (main-site)/          # Routes for tingnect.com
│   │   └── (event-site)/         # Routes for event.tingnect.com
│   ├── components/               # Shared and site-specific React components
│   ├── data/                     # Static content: agenda, speakers, sponsors, etc.
│   ├── lib/                      # Utility functions (e.g., Telegram Bot, Sheets API)
│   ├── styles/                   # Tailwind and global styles
├── docker/
│   ├── Dockerfile                # Docker container build config
│   └── nginx.conf                # Nginx reverse proxy setup
├── scripts/
│   ├── setup-server.sh          # One-click Ubuntu server setup (Node.js, PM2, etc.)
│   └── deploy.sh                # Deployment automation script
├── .env.example                 # Environment variable template
├── docker-compose.yml           # Docker orchestration
├── next.config.ts               # Rewrites, image domains, appDir config
└── README.md

⚙️ Tech Stack
🧩 Framework: Next.js 15 (App Router)
⚛️ UI Library: React 19
🎨 Styling: Tailwind CSS 4 with custom themes
🎞️ Animation: Framer Motion
📦 Deployment: Docker + Nginx

🤖 Integrations:

Telegram Bot API for real-time notifications
Google Sheets API for form syncing

📦 Deployment Scripts
# 1. Server setup (for Ubuntu)
bash scripts/setup-server.sh
# 2. Project deployment (build + restart + logs)
bash scripts/deploy.sh

🛠️ Custom Features
🖥️ Dual site architecture with subdomain routing via next.config.ts
⚙️ App router structure using (main-site) and (event-site) folders
🔔 Real-time Telegram alerts on registration/sponsor form submission
📊 Google Sheets API integration for data backup and live dashboards
💨 Animated hero sections with Framer Motion and Canvas particles
or scale with Docker + Nginx reverse proxy support