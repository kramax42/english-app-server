import { User } from '@interfaces/users.interface';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	password: String,
});

const UserModel = mongoose.model<User & mongoose.Document>(
	'User',
	userSchema
);

export default UserModel;
