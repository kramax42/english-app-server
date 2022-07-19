import mongoose from 'mongoose';
import { logger } from '@utils/logger';

export function connectToMongoDB() {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
  const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`;

  // Connect to MongoDB
  mongoose
    .connect(mongoUrl)
    .then(() => {
      logger.info(`====== MongoDB Connected ======`);
    })
    .catch((err: any) => {
      logger.error(err);
      process.exit(1);
    });
}