import { User } from '@interfaces/user.interface';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	password: String,
});

export const UserModel = mongoose.model<User & mongoose.Document>(
	'User',
	userSchema
);
