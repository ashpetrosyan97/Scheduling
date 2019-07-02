import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {NewTaskModel} from "../constants/newTaskModel";

@Component({
    selector: 'app-add-or-edit',
    templateUrl: './add-or-edit.component.html',
    styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddOrEditComponent>) {
    }

    createUpdateForm: FormGroup;
    modalTitle: string = `${this.data.action} task`;
    val = this.data.item ? moment(this.data.item.date).toDate() : moment().add({"month": 1}).toDate();

    ngOnInit() {
        this.createUpdateForm = new FormGroup({
            'title': new FormControl(this.data.item ? this.data.item.title : null, Validators.required),
            'description': new FormControl(this.data.item ? this.data.item.description : null, Validators.required),
            'date': new FormControl(this.val, Validators.required),
            'place': new FormControl(this.data.item ? this.data.item.place : null, Validators.required),
            'address': new FormControl(this.data.item ? this.data.item.address : null, Validators.required),
        });
    }

    model: NewTaskModel;

    Submit() {
        let controls = this.createUpdateForm.controls;

        this.model = {
            address: controls['address'].value,
            date: moment(controls['date'].value).toDate(),
            done: false,
            description: controls['description'].value,
            place: controls['place'].value,
            title: controls['title'].value
        };
        if (this.data.item) {
            this.dialogRef.close({...this.model, id: this.data.item.id});
        } else {
            this.dialogRef.close(this.model);
        }
    }
}
