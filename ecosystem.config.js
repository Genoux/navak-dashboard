module.exports = {
  apps : [{
    name   : "index",
    script: 'npm start meteor-school',
    automation: false,
    env_production: {
        NODE_ENV: "production"
    }
  }]
}
