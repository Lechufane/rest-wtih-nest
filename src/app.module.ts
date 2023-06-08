import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017?authMechanism=DEFAULT'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
