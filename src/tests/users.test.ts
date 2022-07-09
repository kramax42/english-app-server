import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import UsersController from '@controllers/users.controller';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response statusCode 200 / findAll', () => {
      const findUser: User[] = userModel;
      const usersContoller = new UsersController();
      const app = new App([usersContoller]);

      return request(app.getServer()).get(`${usersContoller.path}`).expect(200, { data: findUser, message: 'findAll' });
    });
  });

  describe('[GET] /users/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const userId = 1;
      const findUser: User = userModel.find(user => user.id === userId);
      const usersContoller = new UsersController();
      const app = new App([usersContoller]);

      return request(app.getServer()).get(`${usersContoller.path}/${userId}`).expect(200, { data: findUser, message: 'findOne' });
    });
  });

  describe('[POST] /users', () => {
    it('response statusCode 201 / created', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };
      const usersContoller = new UsersController();
      const app = new App([usersContoller]);

      return request(app.getServer()).post(`${usersContoller.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const userId = 1;
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };
      const usersContoller = new UsersController();
      const app = new App([usersContoller]);

      return request(app.getServer()).put(`${usersContoller.path}/${userId}`).send(userData).expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response statusCode 200 / deleted', () => {
      const userId = 1;
      const deleteUser: User[] = userModel.filter(user => user.id !== userId);
      const usersContoller = new UsersController();
      const app = new App([usersContoller]);

      return request(app.getServer()).delete(`${usersContoller.path}/${userId}`).expect(200, { data: deleteUser, message: 'deleted' });
    });
  });
});
