module.exports = {
  apps: [
    {
			name: "feishu-test",
      script: "./src/app.js",
      instances: 1,
      autorestart: false,
      watch: false,
      ignore_watch: ["node_modules", "uploads"],
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
