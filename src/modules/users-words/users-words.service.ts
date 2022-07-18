import { WordNotFoundException } from '@/exceptions/word-not-found.exceptions';
import { UserWord } from '@/interfaces/user-word.interface';
import UsersWordsRepository from './users-words.repository';
import {
	CreateUserWordDto,
	UpdateUserWordDto,
} from '@dtos/user-word.dto';

class UsersWordsService {
	private readonly usersWordsRepository = new UsersWordsRepository();

	async create(wordDto: CreateUserWordDto) {

		const existedWord = await this.find(wordDto.word);
		if (existedWord) {
			return null;
		}

		const createdWord = await this.usersWordsRepository.create(wordDto);

		// await newWord.save();

		return createdWord;
	}

	async findAll(): Promise<UserWord[]> {
		const words = await this.usersWordsRepository.findAll();
		return words;
	}

	async findById(userId: string): Promise<UserWord> {
		const foundWord = await this.usersWordsRepository.findById(userId);
		if (!foundWord) throw new WordNotFoundException();

		return foundWord;
	}

	async update(
		id: string,
		wordDto: UpdateUserWordDto
	): Promise<UserWord> {
		const foundWord = await this.usersWordsRepository.findById(id);
		if (!foundWord) throw new WordNotFoundException();

		const updatedWord = await this.usersWordsRepository.update(
			id,
			wordDto
		);
		return updatedWord;
	}

	async delete(id: string): Promise<UserWord> {
		const foundWord = await this.usersWordsRepository.findById(id);
		if (!foundWord) throw new WordNotFoundException();

		const deletedWord = await this.usersWordsRepository.delete(id);
		return deletedWord;
	}

	async find(word: string) {
		return this.usersWordsRepository.find(word);
	}
}

export default UsersWordsService;
