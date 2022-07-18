import { WordStudyStatus } from '@/interfaces/user-word.interface';
import { IsStudyStatus } from '@/utils/validators/study-status.validator';
import { CreateCommonWordDto, UpdateCommonWordDto } from './common-word.dto';
 
export class CreateUserWordDto extends CreateCommonWordDto {
  @IsStudyStatus({
    message: "Incorrect word study status."
  })
  public studyStatus: WordStudyStatus;
}
 
export class UpdateUserWordDto extends UpdateCommonWordDto {
  @IsStudyStatus({
    message: "Incorrect word study status."
  })
  public studyStatus: WordStudyStatus;
}