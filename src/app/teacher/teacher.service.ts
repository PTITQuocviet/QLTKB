import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { SubjectsModel } from "../shared/model/subjects.model";

@Injectable({ providedIn: 'root' })
export class TeacherService {

    baseURL: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.baseURL;
    }

    /** tạo request tìm kiếm   */
    requestSearch(): Observable<SubjectsModel[]> {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL + '/teacher/schedule');
        // url.searchParams.set('maGV', maGV);
        return this.http.get<SubjectsModel[]>(url.href)
    }

    requestCreate(subjectsModel: SubjectsModel ){
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL + "/teacher/create-subject");
        // url.searchParams.set('maGV', maGV);
        return this.http.post<SubjectsModel>(url.href, subjectsModel)
    }
}