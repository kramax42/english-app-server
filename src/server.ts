process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import validateEnv from '@utils/validators/env.validator';

import { AuthService } from '@modules/auth/services/auth.service';
import { UsersController } from '@modules/users/controllers/users.controller';
import { UsersService } from '@modules/users/services/users.service';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { CommonWordsRepository } from '@modules/common-words/repositories/common-words.repository';
import { CommonWordsService } from '@modules/common-words/services/common-words.service';
import { CommonWordsController } from '@modules/common-words/controllers/common-words.controller';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { UsersWordsController } from '@modules/users-words/controllers/users-words.controller';
import { UsersWordsRepository } from '@modules/users-words/repositories/users-words.repository';
import { UsersWordsService } from '@modules/users-words/services/users-words.service';
import { SystemStatusController } from '@modules/system-status/controllers/system-status.controller';
import { SystemStatusService } from '@modules/system-status/services/system-status.service';


validateEnv();

const app = new App([
	new SystemStatusController(new SystemStatusService()),
	new AuthController(new AuthService(new UsersRepository())),
	new UsersController(new UsersService(new UsersRepository())),
	new CommonWordsController(new CommonWordsService(new CommonWordsRepository())),
	new UsersWordsController(new UsersWordsService(new UsersWordsRepository())),
]);

app.listen();

