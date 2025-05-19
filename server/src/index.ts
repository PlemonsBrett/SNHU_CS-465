import path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';

// ES Module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Configure static file serving - keep this for serving CSS, images, etc.
app.use(express.static(path.join(__dirname, '../public')));

// Configure Handlebars view engine
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
import routes from './routes';
app.use('/', routes);

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).render('404', {
    title: 'Page Not Found',
    year: new Date().getFullYear(),
  });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Server Error',
    year: new Date().getFullYear(),
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
