import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class SidebarService {

    sidebarCollapsed = new BehaviorSubject<boolean>(false);

    baseURL: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.baseURL;
    }

    /** tạo request tìm kiếm   */
    requestSearch(): Observable<SidebarModel[]> {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL + environment.apiCenter + '/get-center');
        return this.http.get<SidebarModel[]>(url.href)
    }

    requestUpdate(sidebarModel: SidebarModel) {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL + '/center/create-center');
        // url.searchParams.set('maMH', maMH);
        return this.http.post(url.href, sidebarModel)
    }
}

export class SidebarModel {
    id: number;
    name: string;
    address: string;
    branch: string;
}