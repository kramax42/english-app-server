import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import AuthController from '@controllers/auth.controller';
import mongoose, { disconnect } from 'mongoose';

const loginDto: CreateUserDto = {
	name: 'max',
	email: 'm22wax@max.com',
	password: 'q1w2e3r4',
};

// describe('AuthController (e2e)', () => {
// 	let app: App;
// 	let createdId: string;
// 	let token: string;

// 	beforeEach(async () => {
// 		const authContoller = new AuthController();
//     const app = new App([authContoller]);
// 	});

// 	it('/auth/login (POST) - success', async (done) => {
// 		return request(app.getServer())
// 			.post('/login')
// 			.send(loginDto)
// 			.expect(200)
// 			.then(({ body }: request.Response) => {
// 				expect(body.access_token).toBeDefined();
// 				done();
// 			});
// 	});

// 	it('/auth/login (POST) - fail password', () => {
// 		return request(app.getServer())
// 			.post('/auth/login')
// 			.send({ ...loginDto, password: '2' })
// 			.expect(401, {
// 				statusCode: 401,
// 				message: "Неверный пароль",
// 				error: "Unauthorized"
// 			});
// 	});

// 	it('/auth/login (POST) - fail password', () => {
// 		return request(app.getServer())
// 			.post('/auth/login')
// 			.send({ ...loginDto, login: 'aaa@a.ru' })
// 			.expect(401, {
// 				statusCode: 401,
// 				message: "Пользователь с таким email не найден",
// 				error: "Unauthorized"
// 			});
// 	});

// 	afterAll(() => {
// 		disconnect();
// 	});
// });

describe('Users e2e', () => {
	let app: App;

	beforeAll(async () => {
		try {
			await mongoose.disconnect();
			await mongoose.connection.close();
		} catch (err) {
			console.log(err);
		}

		const authContoller = new AuthController();
		app = new App([authContoller]);
	});

	it('SignUp - success', async () => {
		const res = await request(app.app)
			.post('/signup')
			.send({ email: 'xawrwdwt12@a.ru', password: '11rth2dsaf', name: 'name' });
		expect(res.statusCode).toBe(201);
	});

	it('SignUp - error', async () => {
		const res = await request(app.app)
			.post('/signup')
			.send({ email: 'a.ru', password: '1', name: 'name' });
		expect(res.statusCode).toBe(400);
	});

	it('Login - success', async () => {
		// const res = await request(app.app).post('/login').send(loginDto);
		// expect(res.statusCode).toBe(200);

		return request(app.getServer())
			    .post('/login')
			    .send(loginDto)
			    .expect('Set-Cookie', /^Authorization=.+/);
	});

	it('Login - error', async () => {
		const res = await request(app.app)
			.post('/login')
			.send({ email: 'a@a.ru', password: '1', name: 'name' });
		expect(res.statusCode).toBe(403);
	});

	// it('Info - success', async () => {
	// 	const login = await request(app.app)
	// 		.post('/login')
	// 		.send({ email: 'a@a.ru', password: 'asdasdasd' });
	// 	const res = await request(application.app)
	// 		.get('/users/info')
	// 		.set('Authorization', `Bearer ${login.body.jwt}`);
	// 	expect(res.body.email).toBe('a@a.ru');
	// });

	// 	it('Info - error', async () => {
	// 		const res = await request(application.app).get('/users/info').set('Authorization', `Bearer 1`);
	// 		expect(res.statusCode).toBe(401);
	// 	});
	// });

	afterAll(async () => {
		try {
			await mongoose.disconnect();
			await mongoose.connection.close();
		} catch (err) {
			console.log(err);
		}
	});

	// describe('Testing Auth', () => {
	//   describe('[POST] /signup', () => {
	//     it('response should have the Create userData', () => {
	// const userData: CreateUserDto = {
	//   email: 'test@email.com',
	//   password: 'q1w2e3r4',
	//   name: 'petr'
	// };
	//       const authContoller = new AuthController();
	//       const app = new App([authContoller]);

	//       return request(app.getServer()).post('/signup').send(userData);
	//     });
	//   });

	// describe('[POST] /login', () => {
	//   it('response should have the Set-Cookie header with the Authorization token', async () => {
	//     const userData: CreateUserDto = {
	//       email: 'lim@gmail.com',
	//       password: 'q1w2e3r4',
	//       name: 'lim'
	//     };

	//     const authContoller = new AuthController();
	//     const app = new App([authContoller]);

	//     return request(app.getServer())
	//       .post('/login')
	//       .send(userData)
	//       .expect('Set-Cookie', /^Authorization=.+/);
	//   });
	// });

	// error: StatusCode : 404, Message : Authentication token missing
	// describe('[POST] /logout', () => {
	//   it('logout Set-Cookie Authorization=; Max-age=0', () => {
	//     const authContoller = new AuthController();
	//     const app = new App([authContoller]);

	//     return request(app.getServer())
	//       .post('/logout')
	//       .expect('Set-Cookie', /^Authorization=\;/);
	//   });
	// });
});
