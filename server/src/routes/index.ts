import express from 'express';
import { pagesController } from '../controllers/pagesController.js';

const router: express.Router = express.Router();

// Define routes with controllers
router.get('/', pagesController.getHomePage);
router.get('/about', pagesController.getAboutPage);
router.get('/contact', pagesController.getContactPage);
router.get('/meals', pagesController.getMealsPage);
router.get('/news', pagesController.getNewsPage);
router.get('/rooms', pagesController.getRoomsPage);
router.get('/travel', pagesController.getTravelPage);

export default router;
