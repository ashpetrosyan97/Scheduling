import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TaskModel} from "./constants/taskModel";
import {Statuses} from "./constants/statuses";
import {AddOrEditComponent} from "./add-or-edit/add-or-edit.component";
import {HttpCallService} from "./http-call.service";
import {PopupComponent} from "./popup/popup.component";


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    displayedColumns: string[] = ['actions', 'title', 'description', 'status', 'date', 'place', 'address'];
    dataSource: MatTableDataSource<TaskModel> = new MatTableDataSource();
    statuses = Statuses;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private dialog: MatDialog, public httpCall: HttpCallService) {
        this.reloadData();

    }

    notify() {
        let messages = [];
        this.dataSource.data.forEach((elm) => {
            if (elm.remainingTime < 24 * 60 * 60 * 1000 && elm.remainingTime > 0) messages.push(elm.title)
        });
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            title: `Today's tasks to complete`,
            indexing: true,
            content: messages
        };
        if (messages.length)
            this.dialog.open(PopupComponent, dialogConfig);
    }

    reloadData() {
        this.httpCall.getAll()
            .subscribe((data) => {
                this.dataSource.data = [...data];
                this.notify()
            })
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => data.title.includes(filter) || data.place.includes(filter) || data.address.includes(filter);
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    delete(item) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {title: 'Confirmation', content: ["Are you sure to delete this task"]};
        const dialogRef = this.dialog.open(PopupComponent, dialogConfig);
        dialogRef.afterClosed()
            .subscribe((res) => {
                if (res) this.httpCall.delete(item.id)
                    .subscribe(() => this.reloadData())
            })

    }

    done(item) {
        item.done = true;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {title: 'Confirmation', content: ["Are you sure to make this task as done"]};
        const dialogRef = this.dialog.open(PopupComponent, dialogConfig);
        dialogRef.afterClosed()
            .subscribe((res) => {
                if (res) this.httpCall.edit(item)
                    .subscribe(() => this.reloadData())
            })
    }

    edit(item) {
        this.httpCall.get(item.id)
            .subscribe((res) => {
                if (res) {
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.disableClose = false;
                    dialogConfig.autoFocus = true;
                    dialogConfig.data = {item, action: "edit"};
                    const dialogRef = this.dialog.open(AddOrEditComponent, dialogConfig);
                    return dialogRef.afterClosed()
                        .subscribe((result) => {
                            if (result) {
                                this.httpCall.edit(result)
                                    .subscribe((res) => {
                                        if (res) this.reloadData()
                                    })
                            }
                        })
                }
            })
    }

    addTask() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {action: "add"};
        const dialogRef = this.dialog.open(AddOrEditComponent, dialogConfig);
        return dialogRef.afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.httpCall.create(result)
                        .subscribe((res) => {
                            if (res) this.reloadData()
                        })
                }
            })
    }
}

