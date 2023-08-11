import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';


@Controller('example')
export class ExampleController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send-push')
  async sendPush(@Body() body: { deviceIds: string[], message: string }) {
    const { deviceIds, message } = body;
    return this.notificationService.sendPushNotification(deviceIds, message);
  }
}
