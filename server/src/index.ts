import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Configure static file serving
app.use(express.static(path.join(__dirname, '../public')));

// Routes
import routes from './routes';
app.use('/', routes);

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, '../public/error.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
