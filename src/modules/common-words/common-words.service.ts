import { WordNotFoundException } from '@/exceptions/word-not-found.exceptions';
import { CommonWord } from '@/interfaces/common-word.interface';
import CommonWordsRepository from './common-words.repository';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';

class CommonWordsService {
	private readonly commonWordsRepository = new CommonWordsRepository();

	async createWord(wordDto: CreateCommonWordDto) {

		const existedWord = await this.findWord(wordDto.word);
		if (existedWord) {
			return null;
		}

		const createdWord = await this.commonWordsRepository.createWord(wordDto);

		// await newWord.save();

		return createdWord;
	}

	async getAllWords(): Promise<CommonWord[]> {
		const words = await this.commonWordsRepository.getAllWords();
		return words;
	}

	async findWordById(userId: string): Promise<CommonWord> {
		const foundWord = await this.commonWordsRepository.findWordById(userId);
		if (!foundWord) throw new WordNotFoundException();

		return foundWord;
	}

	async updateWord(
		id: string,
		wordDto: UpdateCommonWordDto
	): Promise<CommonWord> {
		const foundWord = await this.commonWordsRepository.findWordById(id);
		if (!foundWord) throw new WordNotFoundException();

		const updatedUser = await this.commonWordsRepository.updateWord(
			id,
			wordDto
		);
		return updatedUser;
	}

	async deleteWord(id: string): Promise<CommonWord> {
		const foundWord = await this.commonWordsRepository.findWordById(id);
		if (!foundWord) throw new WordNotFoundException();

		const deletedWord = await this.commonWordsRepository.deleteWord(id);
		return deletedWord;
	}

	async findWord(word: string) {
		return this.commonWordsRepository.findWord(word);
	}
}

export default CommonWordsService;
