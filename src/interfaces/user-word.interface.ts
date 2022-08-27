import mongoose from "mongoose";
import { CommonWord } from "./common-word.interface";

export enum WordStudyStatus {
  LEARN = 'learn',
  KNOW = 'know',
}

export interface UserWord extends CommonWord {
  user: mongoose.Schema.Types.ObjectId;
  commonWord: mongoose.Schema.Types.ObjectId;
  studyStatus: WordStudyStatus;
}