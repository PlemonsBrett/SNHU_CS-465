import path from 'node:path';
import express from 'express';

const router = express.Router();

// Define an array of valid page routes
const pages = [
  { route: '/', file: 'index.html' },
  { route: '/about', file: 'about.html' },
  { route: '/contact', file: 'contact.html' },
  { route: '/meals', file: 'meals.html' },
  { route: '/news', file: 'news.html' },
  { route: '/rooms', file: 'rooms.html' },
  { route: '/travel', file: 'travel.html' },
];

// Create routes for each page
for (const page of pages) {
  router.get(page.route, (_req, res) => {
    res.sendFile(path.join(__dirname, `../../public/${page.file}`));
  });
}

export default router;
