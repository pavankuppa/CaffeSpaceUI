import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FreeOffersDataSource } from '../core/datasource/free-offers.datasource';
import { FreeOffers } from '../core/interfaces/caffe_interace';
import { CaffeServices } from '../core/services/caffe.services';

@Component({
    selector: 'app-free-offers',
    templateUrl: './free-offers.component.html',
    styleUrls: ['./free-offers.component.scss']
})
export class FreeOffersComponent implements OnInit {

    displayedColumns: string[] = ['select', 'name', 'items', 'price'];
    freeOffersDataSource: FreeOffersDataSource;
    data: FreeOffers[] = [];

    freeSelection = new SelectionModel<FreeOffers>(true, []);

    @Output() selectionFreeOffersEvent = new EventEmitter<FreeOffers[]>();

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    constructor(private caffeServices: CaffeServices) {
        this.freeOffersDataSource = new FreeOffersDataSource(this.caffeServices)
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.getFreeOffers()
    }

    getFreeOffers(){
        this.freeOffersDataSource.getOffers().then(() => {
        })
    }



    isAllSelected() {
        const numSelected = this.freeSelection.selected.length;
        const numRows = this.freeOffersDataSource.data.length;
        return numSelected === numRows;
    }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.freeSelection.clear();
            this.selectionFreeOffersEvent.emit(this.freeSelection.selected);
            return;
        }

        this.freeSelection.select(...this.freeOffersDataSource.data);
        this.selectionFreeOffersEvent.emit(this.freeSelection.selected);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: FreeOffers): string {
        if (row == undefined) {
            return "deselect all";
        } else {
            if (!row) {
                return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
            }
            return `${this.freeSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.offer_id + 1}`;
        }
    }

    selectFreeOffer(row: FreeOffers){
        this.freeSelection.toggle(row)
        this.selectionFreeOffersEvent.emit(this.freeSelection.selected);
    }

    clear(){
        this.freeSelection.clear()
        this.selectionFreeOffersEvent.emit(this.freeSelection.selected);
    }

}
