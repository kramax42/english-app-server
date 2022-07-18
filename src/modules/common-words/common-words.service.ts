import { WordNotFoundException } from '@/exceptions/word-not-found.exceptions';
import { CommonWord } from '@/interfaces/common-word.interface';
import CommonWordsRepository from './common-words.repository';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';

class CommonWordsService {
	private readonly commonWordsRepository = new CommonWordsRepository();

	async create(wordDto: CreateCommonWordDto) {

		const existedWord = await this.find(wordDto.word);
		if (existedWord) {
			return null;
		}

		const createdWord = await this.commonWordsRepository.create(wordDto);

		// await newWord.save();

		return createdWord;
	}

	async findAll(): Promise<CommonWord[]> {
		const words = await this.commonWordsRepository.findAll();
		return words;
	}

	async findById(userId: string): Promise<CommonWord> {
		const foundWord = await this.commonWordsRepository.findById(userId);
		if (!foundWord) throw new WordNotFoundException();

		return foundWord;
	}

	async update(
		id: string,
		wordDto: UpdateCommonWordDto
	): Promise<CommonWord> {
		const foundWord = await this.commonWordsRepository.findById(id);
		if (!foundWord) throw new WordNotFoundException();

		const updatedWord = await this.commonWordsRepository.update(
			id,
			wordDto
		);
		return updatedWord;
	}

	async delete(id: string): Promise<CommonWord> {
		const foundWord = await this.commonWordsRepository.findById(id);
		if (!foundWord) throw new WordNotFoundException();

		const deletedWord = await this.commonWordsRepository.delete(id);
		return deletedWord;
	}

	async find(word: string) {
		return this.commonWordsRepository.find(word);
	}
}

export default CommonWordsService;
