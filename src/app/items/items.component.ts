import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemDataSource } from '../core/datasource/item.datasource';
import { CaffeServices } from '../core/services/caffe.services';
import { MatDialog } from '@angular/material/dialog';
import { OfferDialog } from '../dialog/offer/offer.dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MenuItems } from '../core/interfaces/caffe_interace';



@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['select', 'item_name', 'quantity', 'price'];
    selection:SelectionModel<MenuItems> = new SelectionModel<MenuItems>(true, []);
    itemDataSource: ItemDataSource;
    data: MenuItems[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @Output() selectionItemEvent = new EventEmitter<MenuItems[]>();
    @Output() offerEvent = new EventEmitter<any>();

    constructor(private caffeServices: CaffeServices, private dialog: MatDialog) {
        this.itemDataSource = new ItemDataSource(this.caffeServices)
    }

    ngOnInit(): void {
        this.itemDataSource.getMenuItems().then(() => {
        })
    }

    ngAfterViewInit() {

    }

    createOffer() {
        this.itemDataSource.data.forEach((x: MenuItems)=>{
            x.free = false
        })
        const dialogRef = this.dialog.open(OfferDialog, { data: this.itemDataSource.data, restoreFocus: false, disableClose: true })
        dialogRef.afterClosed().subscribe(() => {
            this.offerEvent.emit("refresh")
        });
    }

    addItems() {

    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.itemDataSource.data.length;
        return numSelected === numRows;
    }

    toggleAllRows() {

        if (this.isAllSelected()) {
            this.selection.clear();
            this.selectionItemEvent.emit(this.selection.selected);
            return;
        }

        this.selection.select(...this.itemDataSource.data);
        this.selectionItemEvent.emit(this.selection.selected);

    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: MenuItems): string {
        if(row ==undefined){
            return "deselect all";
        } else {
            if (!row) {
                return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
            }
            return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.variant_id + 1}`;
        }
    }

    selectItem(row: MenuItems){
        this.selection.toggle(row)
        this.selectionItemEvent.emit(this.selection.selected);
    }

    clear(){
        this.selection.clear()
        this.selectionItemEvent.emit(this.selection.selected);
    }
}
