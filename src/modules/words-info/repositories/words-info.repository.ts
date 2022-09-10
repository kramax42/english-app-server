import { ICommonWord } from "@/interfaces/common-word.interface";
import { IUserWord } from "@/interfaces/user-word.interface";
import { CommonWordModel } from "@/models/common-word.model";
import { UserWordModel } from "@/models/user-word.model";
import { ILetterPosition, IWordsInfo, WordsInfoModel } from "@/models/words-info.model";
import mongoose from "mongoose";
import { IUpdateWordInfoLetterPositions, IWordsInfoRepository } from "./words-info.repository.interface";

export class WordsInfoRepository implements IWordsInfoRepository {

    private wordsInfoModel = WordsInfoModel;
    // private commonWordModel = CommonWordModel;
    // private userWordModel = UserWordModel;
    // private wordModel;

    // constructor(private readonly wordsMode: 'common-words' | 'user-words') {
    //     if (wordsMode == 'common-words') {
    //         this.wordModel = CommonWordModel;
    //     } else if (wordsMode == 'user-words') {
    //         this.wordModel = UserWordModel;
    //     }
    // }

    async updateWordInfoLetterPositions({
        letter,
        prevLetter,
        updateMode,
        userId,
        wordsInfoDoc,
    }: IUpdateWordInfoLetterPositions) {
        // Promise<ILetterPosition[]> {
        // const wordsInfoDoc = await this.getWordsInfoDoc();


        // const letterPositions = userId
        //     ? wordsInfoDoc.userWords.filter(uw => uw.user == userId)[0].letterPositions
        //     : wordsInfoDoc.commonWords.letterPositions

        // const wordsInfoDoc = await this.getWordsInfoDoc();
        // const letterPositions = userId
        //     ? (await this.wordsInfoModel.findOne({ user: userId })).letterPositions
        //     : (await this.wordsInfoModel.findOne({ user: null })).letterPositions

        const letterPositions = wordsInfoDoc.letterPositions;

        const createWordInLetterPositions = async (letter: string, letterPositions: ILetterPosition[]) => {
            // Check existence letter in letterPositions array
            if (!(letterPositions.filter(lp => lp.letter === letter).length > 0)) {
                letterPositions.push({
                    letter: letter,
                    position: userId
                        ? await (await UserWordModel.find({ normalizedWord: { "$lt": letter } })).length
                        : await (await CommonWordModel.find({ normalizedWord: { "$lt": letter } })).length,
                    wordsAmount: 0,
                })
            }

            const newLetterPositions = letterPositions.map(letterPosition => {
                const newLetterPosition = letterPosition;

                if (letterPosition.letter == letter) {
                    newLetterPosition.wordsAmount = ++letterPosition.wordsAmount;
                }

                if (letterPosition.letter > letter) {
                    newLetterPosition.position = ++letterPosition.position;
                } wordsInfoDoc
                return newLetterPosition;
            }).sort((a, b) => a.letter.localeCompare(b.letter));

            return newLetterPositions;
        }




        const deleteWordInLetterPositions = async (letter: string, letterPositions: ILetterPosition[]) => {
            const newLetterPositions = letterPositions.map((letterPosition, index) => {
                const newLetterPosition = letterPosition;

                if (letterPosition.letter == letter) {
                    newLetterPosition.wordsAmount = --letterPosition.wordsAmount;
                }
                if (letterPosition.letter >= letter && index > 0) {
                    newLetterPosition.position = --letterPosition.position;
                }
                return newLetterPosition;
            })
                .filter(lp => lp.wordsAmount > 0)
                .sort((a, b) => a.letter.localeCompare(b.letter));

            return newLetterPositions;
        }



        let newLetterPositions = letterPositions;

        switch (updateMode) {
            case 'create':
                newLetterPositions = await createWordInLetterPositions(letter, letterPositions);
                break;
            case 'delete':
                newLetterPositions = await deleteWordInLetterPositions(letter, letterPositions);
                break;
            case 'update':
                if (prevLetter) {
                    const letterPositionsAfterDelete = await deleteWordInLetterPositions(prevLetter, letterPositions);
                    newLetterPositions = await createWordInLetterPositions(letter, letterPositionsAfterDelete);
                }
                break;
        }

        wordsInfoDoc.letterPositions = newLetterPositions;
        await wordsInfoDoc.save();
    }


    async getWordsInfoDoc(userId: mongoose.Types.ObjectId = null): Promise<IWordsInfo> {
        // Only one document in commonwords collection.
        const wordsInfoDoc = await this.wordsInfoModel.findOne({ user: userId });
        // if (!wordsInfoDoc) {
        //     const newWordsInfoDoc = await this.wordsInfoModel.create({
        //         user: userId,
        //         amount: 0,
        //         letterPositions: [],
        //     })

        //     return newWordsInfoDoc;
        // }
        return wordsInfoDoc;
    }

    async fullUpdateWordsMap(userId?: mongoose.Types.ObjectId): Promise<Map<string, number>> {
        const letterPositions = new Map<string, number>();
        const words = userId
            ? await UserWordModel.find({ user: userId }).sort({ normalizedWord: 1 })
            : await CommonWordModel.find({}).sort({ normalizedWord: 1 });


        if (words.length == 0) {
            return letterPositions;
        }

        let prevLetter = words[0].normalizedWord.charAt(0);
        letterPositions.set(prevLetter, 0);
        words.forEach((word, index) => {
            if (word.normalizedWord.charAt(0) !== prevLetter) {
                prevLetter = word.normalizedWord.charAt(0);
                letterPositions.set(prevLetter, index);
            }
        })

        const amount = words.length;

        const newLetterPositions = Array.from(letterPositions, ([letter, position]) => ({
            letter,
            position,
        }))
            // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
            .sort((a, b) => a.letter.localeCompare(b.letter))
            .map((lp, index, array) => {
                if (index < array.length - 1) {
                    return {
                        letter: lp.letter,
                        position: lp.position,
                        wordsAmount: array[index + 1].position - array[index].position,
                    }
                } else {
                    return {
                        letter: lp.letter,
                        position: lp.position,
                        wordsAmount: amount - array[index].position,
                    }
                }
            });


        const wordsInfoDoc = await this.wordsInfoModel.findOne({ user: userId });
        if (!wordsInfoDoc) {
            // if (!userId) {
            await this.wordsInfoModel.create({
                letterPositions: newLetterPositions,
                amount,
                user: userId,
            })
            // }
            return letterPositions;
        }

        // // Check existence user words info for this user.
        // if (wordsInfoDoc.userWords.filter(uw => uw.user == userId).length == 0) {


        //     wordsInfoDoc.userWords = [{
        //         letterPositions: newLetterPositions,
        //         amount,
        //         user: userId
        //     }];

        //     await wordsInfoDoc.save();
        //     return letterPositions;
        // }

        // if (userId) {
        //     const arrayIndex = wordsInfoDoc.userWords.findIndex(uw => uw.user == userId);
        //     wordsInfoDoc.userWords[arrayIndex] = { letterPositions: newLetterPositions, amount, user: userId };
        // } else {
        //     wordsInfoDoc.commonWords = { letterPositions: newLetterPositions, amount };
        // }

        // const arrayIndex = wordsInfoDoc.userWords.findIndex(uw => uw.user == userId);
        // { letterPositions: newLetterPositions, amount, user: userId };
        wordsInfoDoc.letterPositions = newLetterPositions;
        wordsInfoDoc.amount = amount;

        await wordsInfoDoc.save();

        return letterPositions;
    }
}