import mongoose from 'mongoose';
import { logger } from '@utils/logger';

export function connectToMongoDB() {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

  // ! TODO: remove this variable
  const tmpPath = 'n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b1g912bljqgjmpu?replicaSet=rs0'
  const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH || tmpPath}`;

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