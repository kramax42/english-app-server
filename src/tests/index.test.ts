import request from 'supertest';
import App from '@/app';
import IndexController from '@controllers/index.controller';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const indexContoller = new IndexController();
      const app = new App([indexContoller]);

      return request(app.getServer()).get(`${indexContoller.path}`).expect(200);
    });
  });
});
