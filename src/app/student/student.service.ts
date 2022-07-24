import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { SubjectsModel } from "../shared/model/subjects.model";
import { ListTeacherModel, PointModel } from "./student.model";

@Injectable({ providedIn: 'root' })
export class StudentService {

    baseURL: string;

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.baseURL;
    }

    /** tạo request tìm kiếm   */
    requestSearch(): Observable<SubjectsModel[]> {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL + environment.apiSubject);
        return this.http.get<SubjectsModel[]>(url.href)
    }

    requestSearchTeacher(maMH: string): Observable<ListTeacherModel[]> {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL+'/teacher/list-teacher-subject');
        url.searchParams.set('subjectCode', maMH);
        return this.http.get<ListTeacherModel[]>(url.href)
    }

    requestSearchPoint(maMH: string): Observable<PointModel> {
        //tham số tìm kiếm null là tìm tất cả user
        const url = new URL(this.baseURL+'/student/point');
        url.searchParams.set('subjectCode', maMH);
        return this.http.get<PointModel>(url.href)
    }

}