import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WaitingQueueModule } from './modules/waiting-queue/waiting-queue.module';

@Module({
  imports: [UsersModule, AuthModule, WaitingQueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
