import {Statuses} from "./statuses";

export interface TaskModel {
    'title': string,
    'description': string,
    'status'?: Statuses,
    'date': Date,
    'done': boolean,
    'remainingTime':number,
    'place': string,
    'address': string
}
