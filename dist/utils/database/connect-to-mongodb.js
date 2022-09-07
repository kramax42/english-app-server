"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const logger_1 = require("../logger");
function connectToMongoDB() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    // ! TODO: remove this variable
    const tmpPath = 'n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b1g912bljqgjmpu?replicaSet=rs0';
    const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH || tmpPath}`;
    // Connect to MongoDB
    mongoose_1.default
        .connect(mongoUrl)
        .then(() => {
        logger_1.logger.info(`====== MongoDB Connected ======`);
    })
        .catch((err) => {
        logger_1.logger.error(err);
        process.exit(1);
    });
}
exports.connectToMongoDB = connectToMongoDB;
//# sourceMappingURL=connect-to-mongodb.js.map