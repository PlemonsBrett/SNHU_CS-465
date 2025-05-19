import type { Request, Response } from 'express';

/**
 * Controller for handling page routes
 */
export const pagesController = {
  /**
   * Render the home page
   */
  getHomePage: (_req: Request, res: Response) => {
    res.render('index', {
      title: 'Home',
      home: true,
      year: new Date().getFullYear(),
    });
  },

  /**
   * Render the about page
   */
  getAboutPage: (_req: Request, res: Response) => {
    res.render('about', {
      title: 'About',
      about: true,
      year: new Date().getFullYear(),
    });
  },

  /**
   * Render the contact page
   */
  getContactPage: (_req: Request, res: Response) => {
    res.render('contact', {
      title: 'Contact',
      contact: true,
      year: new Date().getFullYear(),
    });
  },

  /**
   * Render the meals page
   */
  getMealsPage: (_req: Request, res: Response) => {
    res.render('meals', {
      title: 'Meals',
      meals: true,
      year: new Date().getFullYear(),
    });
  },

  /**
   * Render the news page
   */
  getNewsPage: (_req: Request, res: Response) => {
    res.render('news', {
      title: 'News',
      news: true,
      year: new Date().getFullYear(),
    });
  },

  /**
   * Render the rooms page
   */
  getRoomsPage: (_req: Request, res: Response) => {
    res.render('rooms', {
      title: 'Rooms',
      rooms: true,
      year: new Date().getFullYear(),
    });
  },

  /**
   * Render the travel page
   */
  getTravelPage: (_req: Request, res: Response) => {
    res.render('travel', {
      title: 'Travel',
      travel: true,
      year: new Date().getFullYear(),
    });
  },
};
