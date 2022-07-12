process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import { Server } from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Controller } from '@interfaces/contoller.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import mongoose from 'mongoose';

class App {
	public app: express.Application;
	public port: string | number;
	public env: string;
	public server: Server;

	constructor(controllers: Controller[]) {
		this.app = express();
		this.port = process.env.PORT || 5000;
		this.env = process.env.NODE_ENV || 'development';

		this.connectToTheDatabase();
		this.initializeMiddlewares();
		this.initializeContollers(controllers);
		this.initializeSwagger();
		this.initializeErrorHandling();
	}

	public listen() {
		this.server = this.app.listen(this.port, () => {
			logger.info(`=================================`);
			logger.info(`******* ENV: ${this.env} ********`);
			logger.info(`🚀 App listening on the port ${this.port}`);
			logger.info(`=================================`);
		});
	}

	public getServer() {
		return this.app;
	}

	private connectToTheDatabase() {
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

	private initializeMiddlewares() {
		this.app.use(morgan(config.get('log.format'), { stream }));
		this.app.use(
			cors({
				origin: config.get('cors.origin'),
				credentials: config.get('cors.credentials'),
			})
		);
		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
	}

	private initializeContollers(contollers: Controller[]) {
		contollers.forEach((controller) => {
			this.app.use('/', controller.router);
		});
	}

	private initializeSwagger() {
		const options = {
			swaggerDefinition: {
				info: {
					title: 'REST API',
					version: '1.1.2',
					description: 'Example docs',
				},
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
			security: [
				{
					bearerAuth: [],
				},
			],
			apis: ['swagger.yaml'],
		};

		const specs = swaggerJSDoc(options);
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}
}

export default App;
