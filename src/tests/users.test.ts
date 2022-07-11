import request from 'supertest';
import App from '@/app';
import AuthController from '@modules/auth/auth.controller';
import mongoose from 'mongoose';
import { LoginDto } from '@dtos/auth.dto';
import UsersController from '@modules/users/users.controller';
import { logger } from '@utils/logger';
import { User } from '@interfaces/users.interface';

const userExample: User = {
	_id: '62cc527749f7a5864b076412',
	name: 'Jimbo',
	email: 'user@user.com',
	password: 'qwe123',
};

const loginDto: LoginDto = {
	email: 'user@user.com',
	password: 'qwe123',
};

describe('UsersController (e2e)', () => {
	let app: App;
	let authTokenCookie: string;

	beforeAll(async () => {
		try {
			await mongoose.disconnect();
			await mongoose.connection.close();
		} catch (err) {
			logger.error(err);
		}

		app = new App([new AuthController(), new UsersController()]);
	});

	// ! TO DO - replace to beforeAll method.
	// ! But before remake app initialization in bootstrap method.
	it('/login (POST) - success', async () => {
		return request(app.getServer())
			.post('/login')
			.send(loginDto)
			.expect('Set-Cookie', /^Authorization=.+/)
			.then(({ body }: request.Response) => {
				authTokenCookie = body.data.authTokenCookie;
			});
	});

	it('/users (GET) - success', async () => {
		return request(app.getServer())
			.get('/users')
			.set('cookie', authTokenCookie)
			.expect(200);
	});

	it('/users/:id (PUT) - success', async () => {
		return request(app.getServer())
			.put(`/users/${userExample._id}`)
			.send({
				email: userExample.email,
				name: userExample.name,
				password: userExample.password,
			})
			.set('cookie', authTokenCookie)
			.expect(200);
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
