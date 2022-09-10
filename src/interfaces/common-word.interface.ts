import mongoose from "mongoose";
import { IUserWord } from "./user-word.interface";

export enum WordLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  Uncategorized = 'uncategorized',
}

export enum PartOfSpeech {
  Noun = 'noun',
  Pronoun = 'pronoun',
  Adjective = 'adjective',
  Verb = 'verb',
  Adverb = 'adverb',
  Preposition = 'preposition',
  Article = 'article',
  Determiner = 'determiner',
  Conjunction = 'conjunction',
  Interjection = 'interjection',
}

export interface ITranscription extends mongoose.Document {
  uk: string | null;
  us: string | null;
}

export interface IMeaning {
  pos: PartOfSpeech | null;
  level: WordLevel;
  definition: string | null;
  synonyms: string[];
  antonyms: string[];
  translations: string[];
  usageExamples: string[];
}
export interface ICommonWord extends mongoose.Document {
  // _id: mongoose.Types.ObjectId;
  word: string;
  normalizedWord: string;
  transcription: ITranscription;
  meanings: IMeaning[];
}

export interface ICommonWordResponseDto extends Omit<ICommonWord, '_id' | 'meanings' | 'transcription'> {
  id: string;
  meanings: IMeaning[];
  transcription: Pick<ITranscription, 'us' | 'uk'>;
}

export interface ICommonWordWithUserWordResponseDto extends ICommonWordResponseDto {
  userWord?: IUserWord;
}

