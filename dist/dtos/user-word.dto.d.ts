import { WordStudyStatus } from '../interfaces/user-word.interface';
import { CreateCommonWordDto, UpdateCommonWordDto } from './common-word.dto';
export declare class CreateUserWordDto extends CreateCommonWordDto {
    studyStatus: WordStudyStatus;
}
export declare class UpdateUserWordDto extends UpdateCommonWordDto {
    studyStatus: WordStudyStatus;
}
