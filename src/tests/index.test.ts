import request from 'supertest';
import App from '@/app';
import IndexController from '@/modules/system-status/index.controller';
import mongoose from 'mongoose';
import { logger } from '@utils/logger';

describe('Testing Index', () => {
	let app: App;

	beforeAll(async () => {
		try {
			await mongoose.disconnect();
			await mongoose.connection.close();

			app = new App([new IndexController()]);
		} catch (err) {
			logger.error(err);
		}
	});

	it('/ (GET) - success', async () => {
		return request(app.getServer()).get('/').expect(200);
	});

	afterAll(async () => {
		try {
			await mongoose.disconnect();
			await mongoose.connection.close();
		} catch (err) {
			logger.error(err);
		}
	});
});
