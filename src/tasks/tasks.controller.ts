import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    let tasks: Task[];

    if (Object.keys(filterDto).length) {
      tasks = this.tasksService.getTasksWithFilters(filterDto);
    } else {
      tasks = this.tasksService.getAllTasks();
    }
    return tasks;
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseUUIDPipe) id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTasks(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() body: UpdateTaskStatusDto,
  ): Task {
    const { status } = body;
    return this.tasksService.updateTask(id, status);
  }
}
