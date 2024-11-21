module.exports = {
  apps: [
    {
      name: "myapp",
      script: "npm",
      args: "run dev",

      watch: true,
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        ENV_VAR1: "environment variable",
      },
    },
  ],
};
