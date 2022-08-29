import mongoose from "mongoose";
import { ICommonWord, ICommonWordResponseDto } from "./common-word.interface";

export enum WordStudyStatus {
  LEARN = 'learn',
  KNOW = 'know',
}

export interface IUserWord extends ICommonWord {
  user: mongoose.Schema.Types.ObjectId;
  studyStatus: WordStudyStatus;
}

export interface IUserWordResponseDto extends ICommonWordResponseDto {
  userId: string;
  studyStatus: WordStudyStatus;
}