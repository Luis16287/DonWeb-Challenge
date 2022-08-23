import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmitterService } from 'src/app/services/emitter.service';
import { ShoppingcartService } from 'src/app/services/shopping-cart.service';

@Component({
    selector: 'toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnChanges {
    @Input() show_shopping_cart: boolean = false;
    @Input() on_shopping_cart: boolean = false;
    public searchForm!: FormGroup;
    @Output() searchString: EventEmitter<string> = new EventEmitter<string>();
    public budgeCount: number = 0;

    constructor(
        private fb: FormBuilder,
        private shoppingcartService: ShoppingcartService,
        private emitterService: EmitterService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.buildForm();
        this.emitterService.UpdateShoopingCartBadge.subscribe((value: number) => {
            this.budgeCount += value;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.show_shopping_cart) {
            this.shoppingcartService.getShoppingCartList().subscribe({
                next: (response) => this.budgeCount = response.length
            });
        }
    }

    private buildForm(): void {
        this.searchForm = this.fb.group({
            search: [""]
        });
    }

    public resetForm(): void {
        this.searchForm?.reset();
        this.search();
    }

    public search() {
        const formValue = this.searchForm?.value;
        this.searchString.emit(this.searchForm?.value?.search);

    }

    public goToShoppingCart(): void {
        this.router.navigate(['/shopping-cart']);
    }

    public goToItemsList(): void {
        this.router.navigate(['/items']);
    }
}
