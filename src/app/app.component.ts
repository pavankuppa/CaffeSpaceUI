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

        let order_price = 0
        let items: any = []

        if(this.selectedDiscountOffers.length > 0){
            for(let discountOffer of this.selectedDiscountOffers){
                order_price+=discountOffer.discounted_price
                for(let discountItem of discountOffer.items){
                    items.push({
                        item_name: discountItem.item_name,
                        offer_type: "discount",
                        offer_name: discountOffer.name,
                        quantity: discountItem.quantity,
                        price: discountItem.price,
                        discount_percentage: discountOffer.discount_percentage
                    })

                }
            }
        }

        if(this.selectedFreeOffers.length > 0){
            for(let freeOffer of this.selectedFreeOffers){
                order_price+=freeOffer.price
                for(let freeItem of freeOffer.items){
                    let data: any = {
                        item_name: freeItem.item_name,
                        offer_name: freeOffer.name,
                        offer_type: "free",
                        quantity: freeItem.quantity,
                        price: freeItem.price
                    }
                    if(freeItem.free){
                        data.free = freeItem.free
                    }
                    items.push(data)
                }
            }

        }

        if(this.selectedItems.length > 0){
            for(let item of this.selectedItems){
                order_price+=item.price
                items.push({
                    item_name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })
            }
        }

        let params = {
            order: {
                order_price:order_price,
                order_items_attributes: items
            }
        }

        if(items.length > 0) {
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
