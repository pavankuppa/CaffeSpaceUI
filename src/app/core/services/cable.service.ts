import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import * as ActionCable from 'actioncable'
export const WS_ENDPOINT = environment.wsEndpoint;

import { Subject } from 'rxjs';
import { OrderStatus } from "../interfaces/caffe_interace"


@Injectable({
    providedIn: 'root'
})
export class CableService {
    private consumer: any;

    private orderNotifications = new Subject();
    orderNotifier = this.orderNotifications.asObservable();

    channels: any = []

    IS_UNSUBSCRIBED = true;
    orderNotificationChannel: any;

    subscribeChannels(): void {
        let that = this;
        this.consumer = ActionCable.createConsumer(WS_ENDPOINT);

        this.orderNotificationChannel = this.consumer.subscriptions.create("OrderNotificationChannel", {
            connected() {
                //console.log("WbcNotification Channel: Connected")
                //that.systemNotificatons.next({ status: "success", message: "Connected to the server to get live data from the devices"});
            },
            disconnected: function() {
                console.log("OrderNotificationChannel:Disconnected")
                //that.systemNotificatons.next({ status: "failure", message: "Socket Service terminated by the server"});
            },
            received: function(data: any) {
                that.orderNotifications.next(data);
            }
        })
    }

    unsubscribeChannels(): void{
        this.orderNotificationChannel.unsubscribe()
    }
}
