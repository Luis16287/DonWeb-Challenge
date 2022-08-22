import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
    declarations: [ItemsListComponent, ShoppingCartComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule,
    ]
})
export class PagesModule { }