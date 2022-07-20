import { WordNotFoundException } from '@/exceptions/word-not-found.exceptions';
import { UserWord } from '@/interfaces/user-word.interface';
import UsersWordsRepository from './users-words.repository';
import {
	CreateUserWordDto,
	UpdateUserWordDto,
} from '@dtos/user-word.dto';
import { AlreadyExistsException } from '@/exceptions/already-exist.exception';

class UsersWordsService {
	private readonly usersWordsRepository = new UsersWordsRepository();

	async create(userId: string, wordDto: CreateUserWordDto) {

		const existedWord = await this.find(userId, wordDto.word);
		if (existedWord) {
			throw new AlreadyExistsException();
		}

		const createdWord = await this.usersWordsRepository.create(userId, wordDto);

		// await newWord.save();

		return createdWord;
	}

	async findAll(userId: string): Promise<UserWord[]> {
		const words = await this.usersWordsRepository.findAll(userId);
		return words;
	}

	async findById(userId: string, wordId: string): Promise<UserWord> {
		const foundWord = await this.usersWordsRepository.findById(userId, wordId);
		if (!foundWord) throw new WordNotFoundException();

		return foundWord;
	}

	async update(
		userId: string, wordId: string,
		wordDto: UpdateUserWordDto
	): Promise<UserWord> {
		const foundWord = await this.usersWordsRepository.findById(userId, wordId);
		if (!foundWord) throw new WordNotFoundException();

		const updatedWord = await this.usersWordsRepository.update(
			userId,
			wordId,
			wordDto
		);
		return updatedWord;
	}

	async delete(userId: string, wordId: string): Promise<UserWord> {
		const foundWord = await this.usersWordsRepository.findById(userId, wordId);
		if (!foundWord) throw new WordNotFoundException();

		const deletedWord = await this.usersWordsRepository.delete(userId, wordId);
		return deletedWord;
	}

	async find(userId: string, word: string) {
		return this.usersWordsRepository.find(userId, word);
	}
}

export default UsersWordsService;
