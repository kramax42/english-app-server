import mongoose from 'mongoose';
import { User } from '../interfaces/user.interface';
export declare const UserModel: mongoose.Model<User & mongoose.Document<any, any, any>, {}, {}, {}, any>;
