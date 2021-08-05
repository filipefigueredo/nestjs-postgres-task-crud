import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * Gets all tasks
   *
   * @returns tasks
   */
  getAllTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Gets tasks with filters
   *
   * @param filterDto
   * @returns tasks
   */
  getTasksWithFilters(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        task.title.includes(search) || task.description.includes(search);
      });
    }

    return tasks;
  }

  /**
   * Gets task by id
   *
   * @param id
   * @returns task
   */
  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return task;
  }

  /**
   * Deletes task by id
   *
   * @param id
   * @returns task
   */
  deleteTaskById(id: string): void {
    const matchedTask = this.getTaskById(id);

    this.tasks = this.tasks.filter((task) => task.id !== matchedTask.id);
  }

  /**
   * Creates tasks
   *
   * @param createTaskDto
   * @returns tasks
   */
  createTasks(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  /**
   * Updates task status
   *
   * @param id
   * @param status
   * @returns task
   */

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
