import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'typeorm';
import { TaskService } from '@modules/task/task.service';
import { Task } from '@entities/task/task.entity';
import { AuthProtection } from '@core/decorators/auth-protection.decorator';

@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) {}

  @Get()
  @AuthProtection()
  public findAll() {
    return this.taskService.findAll();
  }

  @Post()
  @AuthProtection()
  public upsert(@Body() body: Task) {
    return this.taskService.upsert(body);
  }

  @Delete(':id')
  @AuthProtection()
  public delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

}