import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatModule} from "./mat.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AddOrEditComponent} from "./add-or-edit/add-or-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material";
import {MAT_DATETIME_FORMATS, MatDatetimepickerModule, MatNativeDatetimeModule} from "@mat-datetimepicker/core";
import {PopupComponent} from "./popup/popup.component";


@NgModule({
    declarations: [
        AppComponent,
        PopupComponent,
        AddOrEditComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatNativeDatetimeModule,
        MatDatetimepickerModule
    ],
    providers: [{
        provide: MAT_DATETIME_FORMATS,
        useValue: {
            parse: {},
            display: {
                dateInput: {year: "numeric", month: "2-digit", day: "2-digit"},
                monthInput: {month: "long"},
                datetimeInput: {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"},
                timeInput: {hour: "2-digit", minute: "2-digit"},
                monthYearLabel: {year: "numeric", month: "short"},
                dateA11yLabel: {year: "numeric", month: "long", day: "numeric"},
                monthYearA11yLabel: {year: "numeric", month: "long"},
                popupHeaderDateLabel: {weekday: "short", month: "short", day: "2-digit"}
            }
        }
    }],
    bootstrap: [AppComponent],
    entryComponents: [AddOrEditComponent, PopupComponent]
})
export class AppModule {
}
