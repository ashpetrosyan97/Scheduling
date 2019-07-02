import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-message-box',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
    modalTitle: string = '';
    content: Array<string> = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.modalTitle = data.title;
        this.content = data.content;
    }

    ngOnInit() {
    }

}
