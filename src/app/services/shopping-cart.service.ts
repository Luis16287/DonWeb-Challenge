import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse } from "../models/api-response";
import { ShoppingCart } from "../models/shopping-cart";

@Injectable({
    providedIn: "root",
})

export class ShoppingcartService {

    constructor(
        private http: HttpClient,
    ) { }

    public getShoppingCartList(): Observable<ShoppingCart[]> {
        return this.http.get<ApiResponse>(
            `http://c1300044.ferozo.com/getListadoCarrito.php`
        ).pipe(map((res) => res.response))
    }

    public removeItem(id_producto: number): Observable<any> {
        return this.http
            .get<any>(
                `http://c1300044.ferozo.com/removerItem.php?id_producto=${id_producto}`
            )
            .pipe(map((res) => res));
    }

}
