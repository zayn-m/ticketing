const { Env } = require('fetch-mongo-envs');
const { app } = require('./app');
const connectDb = require('./config/db');

const start = async () => {
  const fetch = new Env(process.env.MONGO_URI, 'environments', 'ticketing', process.env.NODE_ENV);
  await fetch.build();

  if (process.env.NODE_ENV !== 'test') {
    connectDb();
  }

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log('Server is running on port '+port);
  });
}

start();