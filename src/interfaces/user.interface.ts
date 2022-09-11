import mongoose from "mongoose";
import { Role } from "./auth.interface";

export interface User extends mongoose.Document {
	// _id: mongoose.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	role: Role;
}

export interface UserResponseDTO {
	id: string,
	name: string;
	email: string;
	role: Role;
}
