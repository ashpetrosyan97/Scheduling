import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskModel} from "./constants/taskModel";
import {map} from "rxjs/operators";
import * as moment from "moment";
import {Statuses} from "./constants/statuses";

@Injectable({
    providedIn: 'root'
})
export class HttpCallService {

    constructor(public http: HttpClient) {
    }

    getAll(): Observable<Array<TaskModel>> {
        return this.http.get('http://localhost:3000/api/schedule', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).pipe(map((data: Array<TaskModel>) => {
            data.map((elm) => {
                elm.remainingTime = moment(elm.date).diff(moment(), 'millisecond');
                if (elm.done) elm.status = Statuses.Done;
                else if (moment(elm.date).diff(moment()) < 0)
                    elm.status = Statuses.Expired;
                else elm.status = Statuses.Pending
            });
            return data;
        }))
    }

    get(id: number): Observable<TaskModel> {
        return this.http.get(`http://localhost:3000/api/schedule?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).pipe(map((data: TaskModel) => data))
    }

    create(model) {
        return this.http.post(`http://localhost:3000/api/schedule`, model, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:3000/api/schedule?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    }

    edit(model) {
        return this.http.put(`http://localhost:3000/api/schedule`, model, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    }

}
