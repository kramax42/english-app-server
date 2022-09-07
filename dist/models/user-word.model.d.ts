import mongoose from 'mongoose';
import { IUserWord } from '../interfaces/user-word.interface';
export declare const userWordSchema: mongoose.Schema<IUserWord, mongoose.Model<IUserWord, any, any, any, any>, {}, {}, any, {}, "type", IUserWord>;
export declare const UserWordModel: mongoose.Model<IUserWord & mongoose.Document<any, any, any>, {}, {}, {}, any>;
