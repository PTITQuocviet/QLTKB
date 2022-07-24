import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { CenterTeacherModel } from "./center-teacher.model";
import { AccountModel } from "src/app/shared/model/account.model";

@Injectable({ providedIn: 'root' })
export class CenterTeacherService {

    baseURL: string;
role: number
    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.baseURL;
    }

    /** tạo request tìm kiếm   */
    requestSearch(id: string): Observable<CenterTeacherModel[]> {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL+ '/admin/list-users');

        url.searchParams.set('role', '1');
        url.searchParams.set('centerId', id);
        return this.http.get<CenterTeacherModel[]>(url.href)
    }

    requestUpdate(account: AccountModel) {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL + '/admin/create-account');
        // url.searchParams.set('maMH', maMH);
        return this.http.post(url.href, account)
    }
}