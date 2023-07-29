import { Controller } from '@nestjs/common';
import { TaskService } from '@modules/task/task.service';

@Controller()
export class TaskController {

  constructor(private readonly taskService: TaskService) {}

}