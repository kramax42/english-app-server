import request from 'supertest';
import App from '@/app';
import IndexController from '@controllers/index.controller';
import mongoose from 'mongoose';

describe('Testing Index', () => {
	beforeAll(async () => {
		try {
			await mongoose.disconnect();
			await mongoose.connection.close();
		} catch (err) {
			console.log(err);
		}
	});

	describe('[GET] /', () => {
		it('response statusCode 200', () => {
			const indexContoller = new IndexController();
			const app = new App([indexContoller]);

			return request(app.getServer()).get(`${indexContoller.path}`).expect(200);
		});
	});

	afterAll(async () => {
		try {
			await mongoose.disconnect();
			await mongoose.connection.close();
		} catch (err) {
			console.log(err);
		}
	});
});
