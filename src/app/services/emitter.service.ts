import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EmitterService {

    public UpdateShoopingCartBadge  = new EventEmitter<number>();

}