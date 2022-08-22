import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
    {
        path: '**',
        component: ItemsListComponent
    },
    { path: 'items', component: ItemsListComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent }
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }