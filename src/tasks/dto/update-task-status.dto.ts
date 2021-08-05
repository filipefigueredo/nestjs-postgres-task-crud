import { IsIn } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;
}
