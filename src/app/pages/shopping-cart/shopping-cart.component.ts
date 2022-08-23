import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { EmitterService } from 'src/app/services/emitter.service';
import { ShoppingcartService } from 'src/app/services/shopping-cart.service';
import { SnackBarService } from 'src/app/services/snackBar.service';

@Component({
    selector: 'shopping-cart',
    templateUrl: 'shopping-cart.component.html',
    styleUrls: ['shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
    public itemList: ShoppingCart[] = [];
    public filteredList: ShoppingCart[] = [];
    public columnsToDisplay: string[] = ['id_producto', 'nombre', 'plan', 'valor', 'periodo', ' '];

    constructor(
        private shoppingcartService: ShoppingcartService,
        private snackBarService: SnackBarService,
        private emitterService: EmitterService
    ) { }

    ngOnInit(): void {
        this.shoppingcartService.getShoppingCartList().subscribe({
            next: (response) => {
                this.itemList = response;
                this.filteredList = response;
            },
            error: (error) => this.snackBarService.openSnackBar(error)
        });
    }

    public removeItem(id: number): void {
        this.shoppingcartService.removeItem(id).subscribe({
            next: () => {
                const filteredList = this.itemList.filter(i => i.id_producto !== id);
                this.itemList = [...filteredList];
                this.filteredList = [...filteredList];
                this.emitterService.UpdateShoopingCartBadge.emit(-1);
                this.snackBarService.openSnackBar(`Item ${id} quitado correctamente`)
            },
            error: (error) => this.snackBarService.openSnackBar(error)
        });
    }

    public filterData(searchString: string): void {
        if (!searchString || searchString === '') {
            this.filteredList = this.itemList;
            return;
        }
        const searchTerm = searchString.toLowerCase();

        const filteredList = this.itemList.filter(function (i) {
            return ((i["id_producto"] == +searchTerm || i["nombre"].toLowerCase().indexOf(searchTerm) !== -1 || i["plan"].toLowerCase().indexOf(searchTerm) !== -1 || i["valor"] == +searchTerm || i["periodo"] == +searchTerm));
        })

        this.filteredList = [...filteredList];
    }
}