import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import createDatabaseConnection from 'database/createConnection';
import { addRespondToResponse } from 'middleware/response';
import { authenticateUser } from 'middleware/authentication';
import { handleError } from 'middleware/errors';
import { RouteNotFoundError } from 'errors';

import { attachPublicRoutes, attachPrivateRoutes } from './routes';

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await createDatabaseConnection();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Database connection failed:', error);
    // Exit the process if database connection fails
    process.exit(1);
  }
};

const initializeExpress = (): void => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(addRespondToResponse);

  // Public routes are available without authentication
  attachPublicRoutes(app);

  // Authentication middleware
  app.use('/', authenticateUser);

  // Private routes that require authentication
  attachPrivateRoutes(app);

  // Catch all unmatched routes and return 404
  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));

  // Global error handler
  app.use(handleError);

  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await handleGracefulShutdown();
  process.exit(0);
});

const handleGracefulShutdown = async (): Promise<void> => {
  // Close the database connection and perform any necessary cleanup
  console.log('Closing database connection...');
  // Example: await closeDatabaseConnection();
  console.log('Database connection closed.');
};

initializeApp();
