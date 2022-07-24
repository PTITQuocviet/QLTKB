import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { ManageStudentModel } from "./managestudent.model";

@Injectable({ providedIn: 'root' })
export class ManageStudentService {

    baseURL: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.baseURL;
    }

    /** tạo request tìm kiếm   */
    requestSearch(maMH: string): Observable<ManageStudentModel[]> {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL + '/teacher/list-student');
        url.searchParams.set('subjectCode', maMH);
        return this.http.get<ManageStudentModel[]>(url.href)
    }

    requestSavePoint(manageStudentModel: ManageStudentModel) {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL+'/teacher/edit-point');
        // url.searchParams.set('maMH', maMH);
        return this.http.post(url.href, manageStudentModel)
    }

    requestSave(manageStudentModel: ManageStudentModel[]) {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL+'/teacher/roll-call');
        // url.searchParams.set('maMH', maMH);
        return this.http.post(url.href, manageStudentModel)
    }

}