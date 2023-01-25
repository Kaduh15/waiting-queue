import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WaitingLineModule } from './modules/waiting-line/waiting-line.module';

@Module({
  imports: [UsersModule, AuthModule, WaitingLineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
