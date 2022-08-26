import mongoose from "mongoose";
import { CommonWord, CommonWordResponseDto } from "./common-word.interface";

export enum WordStudyStatus {
  LEARN = 'learn',
  KNOW = 'know',
}

export interface UserWord extends CommonWord {
  user: mongoose.Schema.Types.ObjectId;
  studyStatus: WordStudyStatus;
}

export interface UserWordResponseDto extends CommonWordResponseDto {
  userId: string;
  studyStatus: WordStudyStatus;
}