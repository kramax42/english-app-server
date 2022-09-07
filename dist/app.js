"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
require("dotenv/config");
const compression_1 = tslib_1.__importDefault(require("compression"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const config_1 = tslib_1.__importDefault(require("config"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const error_middleware_1 = require("./middlewares/error.middleware");
const logger_1 = require("./utils/logger");
const connect_to_mongodb_1 = require("./utils/database/connect-to-mongodb");
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 5000;
        this.env = process.env.NODE_ENV || 'development';
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeContollers(controllers);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
    listen() {
        this.server = this.app.listen(this.port, () => {
            logger_1.logger.info(`=================================`);
            logger_1.logger.info(`******* ENV: ${this.env} ********`);
            logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
            logger_1.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    connectToTheDatabase() {
        (0, connect_to_mongodb_1.connectToMongoDB)();
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)(config_1.default.get('log.format'), { stream: logger_1.stream }));
        let whitelist = ['http://localhost:3000', config_1.default.get('cors.origin')];
        this.app.use((0, cors_1.default)({
            // origin: config.get('cors.origin'),
            // credentials: config.get('cors.credentials'),
            origin: function (origin, callback) {
                // if (whitelist.indexOf(origin) !== -1) {
                // 	console.log("allowed cors for:", origin)
                // 	callback(null, true)
                // } else {
                // 	console.log("blocked cors for:", origin)
                // 	callback(new Error('Not allowed by CORS'))
                // }
                callback(null, true);
            },
            allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
            methods: "GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS",
            credentials: true,
        }));
        // this.app.use(function (req, res, next) {
        // 	res.header('Access-Control-Allow-Credentials', 'true');
        // 	res.header('Access-Control-Allow-Origin', config.get('cors.origin'));
        // 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
        // 	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        // 	next();
        // });
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeContollers(contollers) {
        contollers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                openapi: '3.0.1',
                info: {
                    title: 'REST API',
                    version: '2.1.0',
                    description: 'Api documentation.',
                },
            },
            apis: ['swagger.yaml'],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.errorMiddleware);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map