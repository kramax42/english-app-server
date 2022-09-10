import { WordNotFoundException } from '@/exceptions/word-not-found.exceptions';
import { IUserWord, IUserWordResponseDto } from '@/interfaces/user-word.interface';
import {
	CreateUserWordDto,
	UpdateUserWordDto,
} from '@dtos/user-word.dto';
import { AlreadyExistsException } from '@/exceptions/already-exist.exception';
import { IUsersWordsService } from './users-words.service.interface';
import { IUsersWordsRepository } from '../repositories/users-words.repository.interface';
import { WordLevel } from '@/interfaces/common-word.interface';

export class UsersWordsService implements IUsersWordsService {

	constructor(private readonly usersWordsRepository: IUsersWordsRepository) { }

	async create(userId: string, createUserWordDto: CreateUserWordDto) {
		const existedWord = await this.find(userId, createUserWordDto.word);
		if (existedWord) {
			throw new AlreadyExistsException();
		}
		const createdWord = await this.usersWordsRepository.create(userId, createUserWordDto);
		return createdWord;
	}

	async findAll(
		userId: string,
		skip: number = 0,
		limit: number | undefined
	): Promise<IUserWord[]> {
		const words = await this.usersWordsRepository.findAll(userId, skip, limit);
		return words;
	}

	async count(userId: string): Promise<number> {
		const wordsCount = await this.usersWordsRepository.count(userId);
		return wordsCount;
	}

	async findById(userId: string, wordId: string): Promise<IUserWord> {
		const foundWord = await this.usersWordsRepository.findById(userId, wordId);
		if (!foundWord) throw new WordNotFoundException();
		return foundWord;
	}

	async getPageByLetter(userId: string, letter: string, limit: number): Promise<number> {
		const page = await this.usersWordsRepository.getPageByLetter(userId, letter, limit);
		return page;
	}

	async update(
		userId: string, wordId: string,
		updateUserWordDto: UpdateUserWordDto
	): Promise<IUserWord> {
		const foundWord = await this.usersWordsRepository.findById(userId, wordId);
		if (!foundWord) throw new WordNotFoundException();


		// Forbidden updating word
		// with name that already belongs to another word. 
		if (foundWord.word !== updateUserWordDto.word) {
			const existedWord = await this.find(userId, updateUserWordDto.word);
			if (existedWord) {
				throw new AlreadyExistsException();
			}
		}

		const updatedWord = await this.usersWordsRepository.update(
			userId,
			wordId,
			updateUserWordDto
		);
		return updatedWord;
	}

	async delete(userId: string, wordId: string): Promise<IUserWord> {
		const foundWord = await this.usersWordsRepository.findById(userId, wordId);
		if (!foundWord) throw new WordNotFoundException();

		const deletedWord = await this.usersWordsRepository.delete(userId, wordId);
		return deletedWord;
	}

	async find(userId: string, word: string) {
		return this.usersWordsRepository.find(userId, word);
	}

	transformUserWordForResponseDTO(word: IUserWord): IUserWordResponseDto {
		return {
			id: word._id,
			studyStatus: word.studyStatus,
			userId: word.user.toString(),
			word: word.word,
			normalizedWord: word.normalizedWord,
			transcription: {
				uk: word.transcription.uk || null,
				us: word.transcription.us || null,
			},
			meanings: word.meanings.map(meaning => {
				return {
					pos: meaning.pos || null,
					definition: meaning.definition || null,
					translations: meaning.translations,
					synonyms: meaning.synonyms,
					antonyms: meaning.antonyms,
					level: meaning.level.toUpperCase() as WordLevel,
					usageExamples: meaning.usageExamples,
				}
			}),
		}
	}
}

