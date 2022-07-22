import { Role } from "./auth.interface";

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	role: Role;
}
