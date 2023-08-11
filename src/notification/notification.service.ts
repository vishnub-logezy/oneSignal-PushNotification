// notification.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificationService {
    private readonly onesignalApiUrl = 'https://onesignal.com/api/v1';
    private readonly onesignalAppId = 'd8790f2a-e2f5-42fc-9e12-fd0243158882';
    private readonly onesignalRestApiKey = 'MzE0NTdlMjAtNjQwNi00YzM0LWExY2EtODZmYWRkNDQxMTc5';

    async sendPushNotification(deviceIds: string[], message: string): Promise<any> {
        const notificationData = {
            app_id: this.onesignalAppId,
            include_player_ids: deviceIds,
            contents: { en: message },
        };

        try {
            const response = await axios.post(
                `${this.onesignalApiUrl}/notifications`,
                notificationData,
                {
                    headers: {
                        Authorization: `Basic ${this.onesignalRestApiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response)

            if (response.status === 200 && response.data.recipients === 0) {
                console.log('Push notification sent successfully, but no recipients were found.');
                return { success: true, recipients: 0 };
            } else if (response.status === 200 && response.data.id) {
                console.log('Push notification sent successfully.');
                return { success: true, recipients: response.data.recipients };
            } else {
                console.error('Failed to send push notification:', response.data);
                return { success: false, recipients: 0 };
            }
        } catch (error) {
            console.error('Error sending push notification:', error.response.data);
            throw new Error('Failed to send push notification');
        }
    }
}
