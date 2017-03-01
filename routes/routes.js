const WebProjectsController = require('../controllers/webprojects_controller');
const AuthenticationContoller = require('../controllers/authentication_controller');
const WorkController = require('../controllers/work_controller');
const SkillsController = require('../controllers/skills_controller');
const FilesController = require('../controllers/files_controller');
const passportService = require('../services/passport');
const passport = require('passport');
const multer = require('multer');


const requireAuth = passport.authenticate('jwt', { session: false }); //by default passport tries to use a cookie-based session, but we are using tokens so set it to false.
const requireSignin = passport.authenticate('local', { session: false }); 
const upload2 = multer();

module.exports = (app) => {
  app.post('/api/webprojects', requireAuth, WebProjectsController.create);
  app.put('/api/webprojects/:id',requireAuth, WebProjectsController.edit);
  app.delete('/api/webprojects/:id', requireAuth, WebProjectsController.delete);
  app.get('/api/webprojects', WebProjectsController.index);
  app.get('/api/webprojects/:id', WebProjectsController.show);

  app.post('/api/signup', requireAuth, AuthenticationContoller.signup);
  app.post('/api/signin', requireSignin, AuthenticationContoller.signin);


  app.post('/api/work', requireAuth, WorkController.create);
  app.put('/api/work/:id', requireAuth, WorkController.edit);
  app.delete('/api/work/:id', requireAuth, WorkController.delete);
  app.get('/api/work', WorkController.index);
  app.get('/api/work/:id', WorkController.show);

  app.post('/api/skills', requireAuth, SkillsController.create);
  app.put('/api/skills/:id', requireAuth, SkillsController.edit);
  app.delete('/api/skills/:id',requireAuth, SkillsController.delete);
  app.get('/api/skills', SkillsController.index);
  app.get('/api/skills/:id', SkillsController.show);


  app.post('/api/files', requireAuth, upload2.single('uploadedFile'), FilesController.create);
  app.get('/api/files', FilesController.index);
  app.get('/api/files/:key', FilesController.show);
  app.delete('/api/files/:key', requireAuth, FilesController.delete);
};
