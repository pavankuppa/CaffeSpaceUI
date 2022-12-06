import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DiscountOffersDataSource } from '../core/datasource/discount-offers.datasource';
import { DiscountOffers } from '../core/interfaces/caffe_interace';
import { CaffeServices } from '../core/services/caffe.services';

@Component({
    selector: 'app-discount-offers',
    templateUrl: './discount-offers.component.html',
    styleUrls: ['./discount-offers.component.scss']
})
export class DiscountOffersComponent implements OnInit {

    displayedColumns: string[] = ['select', 'name', 'items', 'price', 'discount_percentage', 'discounted_price'];
    discountOffersDataSource: DiscountOffersDataSource;
    data: DiscountOffers[] = [];
    discountSelection:SelectionModel<DiscountOffers> = new SelectionModel<DiscountOffers>(true, []);


    @Output() selectionDiscountOffersEvent = new EventEmitter<DiscountOffers[]>();

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    constructor(private caffeServices: CaffeServices) {
        this.discountOffersDataSource = new DiscountOffersDataSource(this.caffeServices)
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.getDiscountOffers()
    }

    getDiscountOffers(){
        this.discountOffersDataSource.getOffers().then(() => {
        })
    }


    isAllSelected() {
        const numSelected = this.discountSelection.selected.length;
        const numRows = this.discountOffersDataSource.data.length;
        return numSelected === numRows;
    }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.discountSelection.clear();
            this.selectionDiscountOffersEvent.emit(this.discountSelection.selected)
            return;
        }

        this.discountSelection.select(...this.discountOffersDataSource.data);
        this.selectionDiscountOffersEvent.emit(this.discountSelection.selected)
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: DiscountOffers): string {
        if (row == undefined) {
            return "deselect all";
        } else {
            if (!row) {
                return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
            }
            return `${this.discountSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.offer_id + 1}`;
        }
    }

    selectDiscountOffer(row: DiscountOffers){
        this.discountSelection.toggle(row)
        this.selectionDiscountOffersEvent.emit(this.discountSelection.selected);
    }

    clear(){
        this.discountSelection.clear()
        this.selectionDiscountOffersEvent.emit(this.discountSelection.selected);
    }

}
