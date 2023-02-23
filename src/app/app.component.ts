import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DiscountOffers, FreeOffers, MenuItems, Orders } from './core/interfaces/caffe_interace';
import { CableService } from './core/services/cable.service';
import { CaffeServices } from './core/services/caffe.services';
import { DiscountOffersComponent } from './discount-offers/discount-offers.component';
import { FreeOffersComponent } from './free-offers/free-offers.component';
import { ItemsComponent } from './items/items.component';
import { OrdersComponent } from './orders/orders.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'CaffeSpaceApp';

    selectedItems: MenuItems[] = [];
    selectedFreeOffers: FreeOffers[] = [];
    selectedDiscountOffers: DiscountOffers[] = []

    @ViewChild(OrdersComponent) orders: OrdersComponent;
    @ViewChild(ItemsComponent) caffeItems: ItemsComponent;
    @ViewChild(FreeOffersComponent) freeOffers: FreeOffersComponent;
    @ViewChild(DiscountOffersComponent) discountOffers: DiscountOffersComponent;


    constructor(private caffeService: CaffeServices, private _snackBar: MatSnackBar, private _cableService: CableService){
        this._cableService.subscribeChannels();
    }

    ngOnInit(){
        this._cableService.orderNotifier.subscribe((data: any) => {
            this.showNofification(`Order ${data.order_number} is ${data.status} successfully.`)

            this.orders.orderDataSource.data.filter((orders: any)=>{})

            let index = this.orders.orderDataSource.data.findIndex((order: Orders)=> order.order_number == data.order_number )

            this.orders.orderDataSource.data[index].status = data.status
        })
    }

    ngOnDestroy(): void {
        this._cableService.unsubscribeChannels();
    }

    refreshOffers(event: any){
        this.discountOffers.getDiscountOffers()
        this.freeOffers.getFreeOffers()
    }

    menuItemSelection(response: MenuItems[]) {
        this.selectedItems = response
    }


    freeOffersSelection(response: FreeOffers[]) {
        this.selectedFreeOffers = response
    }


    discountOffersSelection(response: DiscountOffers[]) {
        this.selectedDiscountOffers = response
    }

    createOrders(){

        //let order_price = 0
        let variants: any = []
        let offers: number[] = []


        if(this.selectedDiscountOffers.length > 0){
            for(let discountOffer of this.selectedDiscountOffers){
                offers.push(discountOffer.offer_id)
            }
        }

        if(this.selectedFreeOffers.length > 0){
            for(let freeOffer of this.selectedFreeOffers){
                offers.push(freeOffer.offer_id)
            }

        }

        if(this.selectedItems.length > 0){
            for(let item of this.selectedItems){
                variants.push(item.variant_id)
            }
        }

        let params = {
            order: {
                variants: variants,
                offers: offers
            }
        }

        if(variants.length > 0 || offers.length > 0) {
            this.caffeService.createOrders(params).then((response: any)=>{
                if(response.order_number){
                    this.showNofification(`Your order ${response.order_number} placed successfully.`)
                    this.orders.getOrders()
                    this.caffeItems.clear()
                    this.freeOffers.clear()
                    this.discountOffers.clear()
                } else {

                }
            })
        } else {
            this.showNofification("Please choose items or discount/free offers")
        }
    }

    showNofification(message: string) {
        this._snackBar.open(message, "", { verticalPosition: 'top', duration: 5000})
    }
}
