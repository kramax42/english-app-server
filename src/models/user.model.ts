import mongoose from 'mongoose';
import { Role } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import { options } from './common/options';

const userSchema = new mongoose.Schema<User>({
	email: String,
	name: String,
	password: String,
	role: { type: String, enum: Object.values(Role), default: Role.USER },
}, options);

export const UserModel = mongoose.model<User & mongoose.Document>(
	'User',
	userSchema
);
