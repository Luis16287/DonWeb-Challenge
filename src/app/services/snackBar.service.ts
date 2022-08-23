import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root",
})

export class SnackBarService {
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    private duration: number = 2000;

    constructor(private _snackBar: MatSnackBar) { }

    openSnackBar(message: string, buttonLabel?: string, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition, duration?: number) {
        this._snackBar.open(message, buttonLabel ?? 'Aceptar', {
            horizontalPosition: horizontalPosition ?? this.horizontalPosition,
            verticalPosition: verticalPosition ?? this.verticalPosition,
            duration: duration ?? this.duration
        });
    }
}