module.exports = {
  apps: [
    {
      name: 'mern-app',
      script: 'src/index.js',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        HOST: '0.0.0.0',
        MONGO_URI: 'mongodb://127.0.0.1:27017/warehouse_management',
        SESSION_SECRET: 'warehouse-secret',
        JWT_SECRET: 'bhaviksecret'
      }
    }
  ]
};
