import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { EmitterService } from 'src/app/services/emitter.service';
import { ItemService } from 'src/app/services/item.service';
import { SnackBarService } from 'src/app/services/snackBar.service';

@Component({
    selector: 'items-list',
    templateUrl: 'items-list.component.html',
    styleUrls: ['items-list.component.scss'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ],
})
export class ItemsListComponent implements OnInit {
    public itemList: Plan[] = [];
    public filteredList: Plan[] = [];    
    columnsToDisplay: string[] = [' ', 'plan', 'nombre', 'periodos'];
    public expandedElement: Plan | null | undefined = null;

    constructor(
        private planService: ItemService,
        private snackBarService: SnackBarService,
        private emitterService: EmitterService
    ) {}

    ngOnInit(): void {
        this.planService.getList().subscribe({
            next: (response) => {
                this.itemList = response;
                this.filteredList = response;
            },
            error: (error) => {
                this.snackBarService.openSnackBar(error);
            }
        });
    }

    public addToShoppingCart(plan: string, periodo: number): void {
        this.planService.addItem(plan, periodo).subscribe({
            next: () => {
                this.snackBarService.openSnackBar('Item agreado correctamente');
                this.emitterService.UpdateShoopingCartBadge.emit(1);
            },
            error: (error) => this.snackBarService.openSnackBar(error)
        });
    }

    public setExpandedElement(element: Plan): void {
        this.expandedElement = this.expandedElement === element ? null : element;
    }

    public getExpandableRowClass(element: Plan): string {
        return element == this.expandedElement ? 'expanded' : 'collapsed';
    }

    public filterData(searchString: string): void {
        if (!searchString || searchString === '') {
            this.filteredList = this.itemList;
            return;
        }
        const searchTerm = searchString.toLowerCase();

        const filteredList = this.itemList.filter(function (i) {
            return ((i["plan"].toLowerCase().indexOf(searchTerm) !== -1 || i["nombre"].toLowerCase().indexOf(searchTerm) !== -1));
        })

        this.filteredList = [...filteredList];
    }
}
