import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';
import { LoginService } from "../login/login.service";

@Injectable({
    providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot):
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.loginService.user.pipe(
            take(1),//sau khi lấy dữ liệu user mới nhất thì tự đồng unsubscribe
            map(user => {
                // const isAuth = user.role;
                if (user?.roles == "TEACHER") {
                    return true;//nếu đã login thì cho đi tiếp
                }
                return this.router.createUrlTree(['/login']);//nếu chưa login thì trả về UrlTree để chuyển hướng trang
            }));
        // return true;
    }
}