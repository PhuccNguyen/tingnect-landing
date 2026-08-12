/**
 * PM2 Ecosystem Configuration — YaaClub Landing Page
 *
 * Usage:
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 reload ecosystem.config.cjs --env production
 *   pm2 logs yaaclub-web
 *   pm2 monit
 */
module.exports = {
  apps: [
    {
      name: 'yaaclub-web',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',

      // instances: 1 vì Next.js standalone chỉ cần 1 process
      instances: 1,
      exec_mode: 'fork',

      // Auto-restart
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      restart_delay: 3000,
      max_restarts: 10,

      // Environment — Production
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      // Environment — Staging (nếu cần test trước)
      env_staging: {
        NODE_ENV: 'production',
        PORT: 3001,
      },

      // Logs
      error_file: '/var/log/pm2/yaaclub-error.log',
      out_file: '/var/log/pm2/yaaclub-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Graceful reload (zero-downtime)
      kill_timeout: 5000,
      listen_timeout: 8000,
    },
  ],
};
