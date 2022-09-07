import mongoose from 'mongoose';
import { ICommonWord, IMeaning, ITranscription } from '../interfaces/common-word.interface';
export declare const transcriptionSchema: mongoose.Schema<ITranscription, mongoose.Model<ITranscription, any, any, any, any>, {}, {}, any, {}, "type", ITranscription>;
export declare const meaningSchema: mongoose.Schema<IMeaning, mongoose.Model<IMeaning, any, any, any, any>, {}, {}, any, {}, "type", IMeaning>;
export declare const commonWordSchema: mongoose.Schema<ICommonWord, mongoose.Model<ICommonWord, any, any, any, any>, {}, {}, any, {}, "type", ICommonWord>;
export declare const CommonWordModel: mongoose.Model<ICommonWord & mongoose.Document<any, any, any>, {}, {}, {}, any>;
