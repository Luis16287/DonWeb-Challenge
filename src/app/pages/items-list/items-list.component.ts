import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { ItemService } from 'src/app/services/item.service';
import { SnackBarService } from 'src/app/services/snackBar.service';

@Component({
    selector: 'items-list',
    templateUrl: 'items-list.component.html',
    styleUrls: ['items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
    public itemList: Plan[] = [];
    displayedColumns: string[] = ['plan', 'nombre', 'periodos', ' '];
    private itemToAdd!: { plan: string; periodo: number; };
    constructor(
        private planService: ItemService,
        private snackBarService: SnackBarService
    ) {}

    ngOnInit(): void {
        this.planService.getList().subscribe({
            next: (response) => {
                this.itemList = response;
                console.log('PLANES >>> ', this.itemList);
            },
            error: (error) => {
                this.snackBarService.openSnackBar(error);
            }
        });
    }

    public setAddData(plan: string, periodo: number): void {
        console.group('setAddData');
        console.log('element >>> ', plan);
        console.log('periodo >>> ', periodo);
        console.groupEnd();
        this.itemToAdd = {  plan,  periodo };
    }

    public addToShoppingCart(): void {
        this.planService.addItem(this.itemToAdd.plan, this.itemToAdd.periodo).subscribe({
            next: () => this.snackBarService.openSnackBar('Item agreado correctamente'),
            error: (error) => this.snackBarService.openSnackBar(error)
        });
    }
}
