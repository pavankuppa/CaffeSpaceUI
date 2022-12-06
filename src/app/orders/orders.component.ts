import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDataSource } from '../core/datasource/order.datasource';
import { Orders } from '../core/interfaces/caffe_interace';
import { CaffeServices } from '../core/services/caffe.services';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    displayedColumns: string[] = ['order_number', 'items'];
    orderDataSource: OrderDataSource;
    data: Orders[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    constructor(private caffeServices: CaffeServices) {
        this.orderDataSource = new OrderDataSource(this.caffeServices)
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.getOrders()
    }

    getOrders(){
        this.orderDataSource.getOrders().then(() => {
        })
    }

}
