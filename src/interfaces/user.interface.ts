import mongoose from "mongoose";
import { Role } from "./auth.interface";

export interface User extends mongoose.Document {
	// _id: mongoose.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	role: Role;
}

export interface UserResponseDTO extends Omit<User, '_id' | 'password'> {
	id: string,
	name: string;
	email: string;
	role: Role;
}
