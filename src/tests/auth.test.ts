import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/user.dto';
import AuthController from '@modules/auth/auth.controller';
import mongoose from 'mongoose';
import { LoginDto } from '@dtos/auth.dto';
import UsersController from '@modules/users/users.controller';
import { logger } from '@utils/logger';

const userDto: CreateUserDto = {
	name: 'max',
	email: 'examplu34@mail.com',
	password: 'q1w2e3r4',
};

const loginDto: LoginDto = {
	email: 'examplu34@mail.com',
	password: 'q1w2e3r4',
};

describe('AuthController (e2e)', () => {
	let app: App;
	let createdUserId: string;
	let accessToken: string;

	beforeAll(async () => {
		try {
			await mongoose.disconnect();
			await mongoose.connection.close();
		} catch (err) {
			logger.error(err);
		}

		app = new App([new AuthController(), new UsersController()]);
	});

	it('/signup (POST) - success', async () => {
		return request(app.getServer())
			.post('/signup')
			.send(userDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdUserId = body.data.id;
				expect(createdUserId).toBeDefined();
			});
	});

	it('/signup (POST) - error', async () => {
		return request(app.getServer())
			.post('/signup')
			.send({ email: 'bademail', password: '1', name: 'name' })
			.expect(400);
	});

	it('/login (POST) - success', async () => {
		return request(app.getServer())
			.post('/login')
			.send(loginDto)
			.expect('Set-Cookie', /^Authorization=.+/)
			.then(({ body }: request.Response) => {
				accessToken = body.data.accessToken;
			});
	});

	it('/login (POST) - error', async () => {
		return request(app.getServer())
			.post('/login')
			.send({ email: 'wrong@mail.ru', password: '123' })
			.expect(401);
	});

	it('/users/:id (DELETE) - success', async () => {
		return (
			request(app.getServer())
				.delete(`/users/${createdUserId}`)
				.set('cookie', `Authorization=${accessToken}`)
				.expect(200)
		);
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
