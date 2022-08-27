import { WordNotFoundException } from '@/exceptions/word-not-found.exceptions';
import { CommonWord, CommonWordWithUserStudyStatusResponseDTO } from '@/interfaces/common-word.interface';
import {
	CreateCommonWordDto,
	UpdateCommonWordDto,
} from '@dtos/common-word.dto';
import { AlreadyExistsException } from '@/exceptions/already-exist.exception';
import { ICommonWordsService } from './common-words.service.interface';
import { ICommonWordsRepository } from '../repositories/common-words.repository.interface';

export class CommonWordsService implements ICommonWordsService {

	constructor(private readonly commonWordsRepository: ICommonWordsRepository) { }

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
		skip: number,
		limit: number | null,
		userId?: string, 
	): Promise<CommonWordWithUserStudyStatusResponseDTO[]> {
		const words = await this.commonWordsRepository.findAll(
			skip,
			limit,
			userId
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

