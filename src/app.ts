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
import { errorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { connectToMongoDB } from './utils/database/connect-to-mongodb';
import { IController } from './interfaces/contoller.interface';


class App {
	public app: express.Application;
	public port: string | number;
	public env: string;
	public server: Server;

	constructor(controllers: IController[]) {
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
		connectToMongoDB()
	}

	private initializeMiddlewares() {
		this.app.use(morgan(config.get('log.format'), { stream }));

		let whitelist = ['http://localhost:3000', config.get('cors.origin')];
		this.app.use(
			cors({
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
			})
		);
		// this.app.use(function (req, res, next) {
		// 	res.header('Access-Control-Allow-Credentials', 'true');
		// 	res.header('Access-Control-Allow-Origin', config.get('cors.origin'));
		// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
		// 	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
		// 	next();
		// });
		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
	}

	private initializeContollers(contollers: IController[]) {
		contollers.forEach((controller) => {
			this.app.use('/', controller.router);
		});
	}

	private initializeSwagger() {
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

		const specs = swaggerJSDoc(options);
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}
}

export default App;
