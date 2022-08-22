import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShoppingcartService } from 'src/app/services/shopping-cart.service';

@Component({
    selector: 'toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnChanges {
    @Input() show_shopping_cart: boolean = false;
    public searchForm!: FormGroup;
    @Output() searchString: EventEmitter<string> = new EventEmitter<string>();
    public budgeCount: number = 0;

    constructor(
        private fb: FormBuilder,
        private shoppingcartService: ShoppingcartService
    ) { }

    ngOnInit(): void {
        this.buildForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.show_shopping_cart) {
            console.log('Llamo para badge');
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
    }

    public search() {
        const formValue = this.searchForm?.value;
        if (formValue.search && formValue.search !== "") {
            this.searchString.emit(this.searchForm?.value?.search)
        } else { return }

    }
}
