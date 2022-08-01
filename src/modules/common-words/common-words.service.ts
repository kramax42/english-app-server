import { WordNotFoundException } from '@/exceptions/word-not-found.exceptions';
import { CommonWord, CommonWordWithUserStudyStatus } from '@/interfaces/common-word.interface';
import CommonWordsRepository from './common-words.repository';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';
import { AlreadyExistsException } from '@/exceptions/already-exist.exception';

class CommonWordsService {
	private readonly commonWordsRepository = new CommonWordsRepository();

	async create(wordDto: CreateCommonWordDto) {
		const existedWord = await this.find(wordDto.word);
		if (existedWord) {
			throw new AlreadyExistsException();
		}

		const createdWord = await this.commonWordsRepository.create(wordDto);

		// await newWord.save();

		return createdWord;
	}

	async findAll(
		documentsToSkip: number = 0,
		limitOfDocuments: number | undefined
	): Promise<CommonWordWithUserStudyStatus[]> {
		const words = await this.commonWordsRepository.findAll(
			documentsToSkip,
			limitOfDocuments
		);
		return words;
	}

	async count(): Promise<number> {
		const wordsCount = await this.commonWordsRepository.count();
		return wordsCount;
	}

	async findById(userId: string): Promise<CommonWord> {
		const foundWord = await this.commonWordsRepository.findById(userId);
		if (!foundWord) throw new WordNotFoundException();

		return foundWord;
	}

	async update(id: string, wordDto: UpdateCommonWordDto): Promise<CommonWord> {
		const foundWord = await this.commonWordsRepository.findById(id);
		if (!foundWord) throw new WordNotFoundException();

		const updatedWord = await this.commonWordsRepository.update(id, wordDto);
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
