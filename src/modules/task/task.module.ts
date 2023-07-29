import { Module } from '@nestjs/common';
import { TaskController } from '@modules/task/task.controller';
import { TaskService } from '@modules/task/task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}