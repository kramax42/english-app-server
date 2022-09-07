"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
require("dotenv/config");
const app_1 = tslib_1.__importDefault(require("./app"));
const env_validator_1 = tslib_1.__importDefault(require("./utils/validators/env.validator"));
const auth_service_1 = require("./modules/auth/services/auth.service");
const users_controller_1 = require("./modules/users/controllers/users.controller");
const users_service_1 = require("./modules/users/services/users.service");
const users_repository_1 = require("./modules/users/repositories/users.repository");
const common_words_repository_1 = require("./modules/common-words/repositories/common-words.repository");
const common_words_service_1 = require("./modules/common-words/services/common-words.service");
const common_words_controller_1 = require("./modules/common-words/controllers/common-words.controller");
const auth_controller_1 = require("./modules/auth/controllers/auth.controller");
const users_words_controller_1 = require("./modules/users-words/controllers/users-words.controller");
const users_words_repository_1 = require("./modules/users-words/repositories/users-words.repository");
const users_words_service_1 = require("./modules/users-words/services/users-words.service");
const system_status_controller_1 = require("./modules/system-status/controllers/system-status.controller");
const system_status_service_1 = require("./modules/system-status/services/system-status.service");
(0, env_validator_1.default)();
const app = new app_1.default([
    new system_status_controller_1.SystemStatusController(new system_status_service_1.SystemStatusService()),
    new auth_controller_1.AuthController(new auth_service_1.AuthService(new users_repository_1.UsersRepository())),
    new users_controller_1.UsersController(new users_service_1.UsersService(new users_repository_1.UsersRepository())),
    new common_words_controller_1.CommonWordsController(new common_words_service_1.CommonWordsService(new common_words_repository_1.CommonWordsRepository())),
    new users_words_controller_1.UsersWordsController(new users_words_service_1.UsersWordsService(new users_words_repository_1.UsersWordsRepository())),
]);
app.listen();
//# sourceMappingURL=server.js.map