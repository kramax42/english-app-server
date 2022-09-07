import { IUserWord } from "./user-word.interface";
export declare enum WordLevel {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2",
    Uncategorized = "uncategorized"
}
export declare enum PartOfSpeech {
    Noun = "noun",
    Pronoun = "pronoun",
    Adjective = "adjective",
    Verb = "verb",
    Adverb = "adverb",
    Preposition = "preposition",
    Article = "article",
    Determiner = "determiner",
    Conjunction = "conjunction",
    Interjection = "interjection"
}
export interface ITranscription {
    _id: string;
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
export interface ICommonWord {
    _id: string;
    word: string;
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
