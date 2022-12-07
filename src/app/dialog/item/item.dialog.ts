import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { VariantAttributes } from "src/app/core/interfaces/caffe_interace";
import { CaffeServices } from "src/app/core/services/caffe.services";


@Component({
    selector: 'item-dialog',
    templateUrl: 'item.dialog.html',
    styleUrls: ['item.dialog.scss'],
})

export class ItemDialog implements OnInit {

    itemName: string = "";
    itemAttributes: VariantAttributes[] = [{
        quantity: "",
        price: 0
    }]

    constructor(public dialogRef: MatDialogRef<ItemDialog>, private _caffeService: CaffeServices) {

    }
    ngOnInit(): void {

    }

    createItem() {
        let params = {
            item: {
                name: this.itemName,
                variants_attributes: this.itemAttributes
            }
        }

        this._caffeService.createItems(params).then((response: any)=>{
            console.log(response)
            this.dialogRef.close()
        })
    }

    addVariant() {
        this.itemAttributes.push({
            quantity: "",
            price: 0
        })
    }

    removeVariant(index: number) {
        this.itemAttributes.splice(index, 1)
    }

}
