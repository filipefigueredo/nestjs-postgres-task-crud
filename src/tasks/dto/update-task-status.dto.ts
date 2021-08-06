import { IsIn } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class UpdateTaskStatusDto {
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;
}
