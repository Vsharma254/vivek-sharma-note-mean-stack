import * as express from 'express';

import UserCtrl from './controllers/user';
import NoteCtrl from './controllers/notes';

export default function setRoutes(app) {

  const router = express.Router();

  const noteCtrl = new NoteCtrl();
  const userCtrl = new UserCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

   // Attendaces
  router.route('/notes').get(noteCtrl.getAll);
  router.route('/notes/count').get(noteCtrl.count);
  router.route('/note').post(noteCtrl.insert);
  router.route('/note/:id').get(noteCtrl.get);
  router.route('/note/:id').put(noteCtrl.update);
  router.route('/note/:id').delete(noteCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
