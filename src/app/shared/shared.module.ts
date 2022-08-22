import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatChipsModule } from '@angular/material/chips'
import { MatTooltipModule } from '@angular/material/tooltip';


import { MatBadgeModule } from '@angular/material/badge';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from "@angular/material/select";

const COMPONENTS = [
    ToolbarComponent
];
@NgModule({
    declarations: [...COMPONENTS],
    exports: [
        ...COMPONENTS,
        MatInputModule,
        MatIconModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        MatBadgeModule,
        MatToolbarModule,
        MatSelectModule
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule,
        MatInputModule,
        MatSnackBarModule,
        MatChipsModule,
        MatTooltipModule,
        MatToolbarModule,
        MatBadgeModule,
        MatSelectModule
    ],
    providers: [
        MatSnackBarModule,
    ],
})
export class SharedModule { }
