const users = require('./users');

module.exports =  function(app) {
  // Mounting API routes
  const prefix = '/api/v1';
  app.use(`${prefix}/users`, users);
}