import mongoose from "mongoose";
import { CommonWord } from "./common-word.interface";

export enum WordStudyStatus {
  LEARN = 'learn',
  KNOW = 'know',
  UNKNOWN = 'unknown',
}

export interface UserWord extends CommonWord {
  user: mongoose.Schema.Types.ObjectId;
  studyStatus: WordStudyStatus;
}