import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse } from "../models/api-response";
import { Plan } from "../models/plan";

@Injectable({
    providedIn: "root",
})

export class ItemService {

    constructor(
        private http: HttpClient,
    ) { }

    public getList(): Observable<Plan[]> {
        return this.http.get<ApiResponse>(
            `http://c1300044.ferozo.com/getListado.php`
        ).pipe(map((res) => res?.response?.planes))
    }

    public addItem(plan: string, periodo: number): Observable<any> {
        return this.http
            .get<any>(
                `http://c1300044.ferozo.com/agregarItem.php?plan=${plan}&periodo=${periodo}`
            )
            .pipe(map((res) => res));
    }

}
