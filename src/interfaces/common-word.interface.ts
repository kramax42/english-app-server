export interface UsageExample {
  sentence: string;
  translation: string;
}
export interface CommonWord {
  word: string;
  transcription: string;
  translation: string[];
  usageExamples: UsageExample[];
}