process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import IndexController from '@/modules/index/index.controller';
import AuthController from '@modules/auth/auth.controller';
import UsersController from '@modules/users/users.controller';

validateEnv();

const app = new App([
	new IndexController(),
	new AuthController(),
	new UsersController(),
]);

app.listen();
