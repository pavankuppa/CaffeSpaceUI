import { SelectionModel } from "@angular/cdk/collections";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MenuItems } from "src/app/core/interfaces/caffe_interace";
import { CaffeServices } from "src/app/core/services/caffe.services";


@Component({
    selector: 'offer-dialog',
    templateUrl: 'offer.dialog.html',
    styleUrls: ['offer.dialog.scss'],
})

export class OfferDialog implements OnInit {

    displayedColumns: string[] = ['select', 'item_name', 'quantity', 'price'];

    offerType: string = 'discount';
    offerName: string = '';
    discountPercentage: number;

    DISCOUNT = "discount"
    FREE = "free";

    selection = new SelectionModel<MenuItems>(true, []);

    constructor(public dialogRef: MatDialogRef<OfferDialog>, @Inject(MAT_DIALOG_DATA) public itemDataSource: MenuItems[], private _caffeService: CaffeServices) {

    }

    selectOfferType(value: any) {
        if (value == this.FREE) {
            this.displayedColumns.push("free")
        } else {
            this.displayedColumns.pop()
        }
        this.offerType = value
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.itemDataSource.length;
        return numSelected === numRows;
    }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.itemDataSource);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: MenuItems): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.variant_id + 1}`;
    }

    ngOnInit(): void {

    }

    createOffer() {
        let params: any = {
            offer: {
                name: this.offerName,
                offer_type: this.offerType,
                offer_items_attributes: []
            }
        }

        if(this.offerType==this.DISCOUNT){
            params.offer.discount_percentage = this.discountPercentage
        }

        this.selection.selected.forEach((x: MenuItems)=>{
            let data: any = {
                variant_id: x.variant_id
            }
            if(this.offerType == this.FREE) {
                if(x.free){
                    data.free = x.free
                }
            }
            params.offer.offer_items_attributes.push(data)
        })



        this._caffeService.createOffers(params).then((response: any)=>{
            if(response){
                this.selection.clear()
                this.offerName = ''
                this.offerType = this.DISCOUNT
                this.discountPercentage = 0
                this.dialogRef.close()
            }
        })

    }

    selectFreeItem(row: MenuItems, free: boolean){
        this.selection.selected.forEach((x:MenuItems)=>{
            if(x.variant_id == row.variant_id){
                x.free = free
            }
        })
    }
}
