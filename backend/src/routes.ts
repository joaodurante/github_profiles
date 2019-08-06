import * as express from 'express';
import { DeveloperController } from './controllers/DeveloperController';
import { LikeController } from './controllers/LikeController';
import { DislikeController } from './controllers/DislikeController';

const routes = express.Router();
const developerController = new DeveloperController();
const likeController = new LikeController();
const dislikeController = new DislikeController();

routes.get('/devs', developerController.index);
routes.post('/devs', developerController.store);
routes.post('/devs/:devId/likes', likeController.store);
routes.post('/devs/:devId/dislikes', dislikeController.store);

export { routes };