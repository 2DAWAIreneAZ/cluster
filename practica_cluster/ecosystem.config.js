module.exports = {
  apps: [{
      name: "App sin Cluster",
      script: "app_sin_cluster.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
