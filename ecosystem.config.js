module.exports = {
  apps: [
    {
      name: "waktu_sholat",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 4001,
      },
      max_memory_restart: "300M",
      out_file: "/root/.pm2/logs/waktu_sholat-out.log",
      error_file: "/root/.pm2/logs/waktu_sholat-error.log",
      merge_logs: true,
      time: true,
    },
  ],
};