import { Body, Controller, Delete, Get, Param, PipeTransform, Post, Put, Query } from '@nestjs/common';
import { TaskService } from '@modules/task/task.service';
import { Task } from '@entities/task/task.entity';
import { AuthProtection } from '@core/decorators/auth-protection.decorator';
import { QueryData } from '@core/type';
import { QueryPipe } from '@core/pipe/query.pipe';

@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) {}

  @Get()
  @AuthProtection()
  public findAll(@Query(new QueryPipe()) query: QueryData<Task>) {
    return this.taskService.findAll(query);
  }

  @Post()
  @AuthProtection()
  public upsert(@Body() body: Task) {
    return this.taskService.upsert(body);
  }

  @Put(':id/finish')
  @AuthProtection()
  public finishTask(@Param('id') id: string) {
    return this.taskService.finishTask(id);
  }

  @Delete(':id')
  @AuthProtection()
  public delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

}