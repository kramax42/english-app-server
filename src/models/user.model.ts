import { Role } from '@/interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	password: String,
	role: { type: String, enum: Object.values(Role), default: Role.USER },
},
{ timestamps: true });

export const UserModel = mongoose.model<User & mongoose.Document>(
	'User',
	userSchema
);
