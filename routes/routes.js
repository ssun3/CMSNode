const WebProjectsController = require('../controllers/webprojects_controller');

module.exports = (app) => {
  app.post('/api/webprojects', WebProjectsController.create);
  app.put('/api/webprojects/:id', WebProjectsController.edit);
  app.delete('/api/webprojects/:id', WebProjectsController.delete);
  app.get('/api/webprojects', WebProjectsController.index);
};
