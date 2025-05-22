import express from 'express';
import { pagesController } from '../controllers/pages.controller.js';
import { getTripById, getTrips } from '../controllers/travel.controller.js';

const router: express.Router = express.Router();

// Define routes with controllers
router.get('/', pagesController.getHomePage);
router.get('/about', pagesController.getAboutPage);
router.get('/contact', pagesController.getContactPage);
router.get('/meals', pagesController.getMealsPage);
router.get('/news', pagesController.getNewsPage);
router.get('/rooms', pagesController.getRoomsPage);

// Travel routes
router.get('/travel', getTrips);
router.get('/travel/:id', getTripById);

export default router;
