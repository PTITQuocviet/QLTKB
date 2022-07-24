import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PaggingModel } from "../shared/model/pagging.model";

@Injectable({ providedIn: 'root' })
export class PaggingService {

    /** lưu trạng thái phân trang của các màn hình quản trị */
    pagging = new BehaviorSubject<PaggingModel>(new PaggingModel(10));


    constructor() {}
}