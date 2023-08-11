import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { ExampleController } from './example/example.controller';

@Module({
  imports: [NotificationModule],
  controllers: [AppController, ExampleController],
  providers: [AppService, NotificationService],
})
export class AppModule {}
