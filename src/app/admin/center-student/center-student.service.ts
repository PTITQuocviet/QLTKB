import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { CenterStudentModel } from "./center-student.model";
import { AccountModel } from "src/app/shared/model/account.model";

@Injectable({ providedIn: 'root' })
export class CenterStudentService {

    baseURL: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.baseURL;
    }

    /** tạo request tìm kiếm   */
    requestSearch(id: string): Observable<CenterStudentModel[]> {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL + '/admin/list-users');
        url.searchParams.set('role', '2');
        url.searchParams.set('centerId', id);
        return this.http.get<CenterStudentModel[]>(url.href)
    }

    requestUpdate(account: AccountModel) {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL + '/admin/create-account');
        // url.searchParams.set('maMH', maMH);
        return this.http.post(url.href, account)
    }
}