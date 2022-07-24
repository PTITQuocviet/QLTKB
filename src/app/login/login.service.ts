import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface LoginResponseData {
    token: string;
    roles: string;
    username: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    user = new BehaviorSubject<User>(null);//BehaviorSubject để các component có thể lấy được giá trị cuối cùng của sự kiện thay đổi User, ngay cả sau khi sự kiện đấy xảy ra
    private tokenExpirationTimer: any;
    // private baseURL = window.location.protocol + '//' + window.location.host;

    constructor(private http: HttpClient, private router: Router) { }

    private loggedIn = false;

    isLoggedIn() {
        return this.loggedIn;
    }

    login(username: string, password: string) {
        const data = {
            username: '',
            password: '',
        }
        data.username = username;
        data.password = password;
        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        return this.http
            // .post<LoginResponseData>(this.baseURL + environment.apiLogin, data.toString(), options)//Dùng khi chuyển môi trường thật
            .post<LoginResponseData>(environment.baseURL + environment.apiLogin, data, httpOptions)
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.username,
                        resData.roles,
                        resData.token
                    );
                })
            );
    }

    autoLogin() {
        const userData: {
            username: string;
            roles: string,
            _token: string;
            _expirationAt: number;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        // console.log('auto login');
        const loadedUser = new User(userData.username, userData.roles);
        loadedUser.token = userData._token;
        if (loadedUser.token) {

            this.user.next(loadedUser);
            const expirationDuration = loadedUser.expirationAt - (new Date()).getTime();
            // this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    /**expirationDuration tính bằng ms */
    // autoLogout(expirationDuration: number) {
    //     this.tokenExpirationTimer = setTimeout(() => {
    //         this.logout();
    //     }, expirationDuration);
    // }

    /**xử lý đăng nhập */
    private handleAuthentication(
        username: string,
        roles: string,
        token: string
    ) {
        const user = new User(username, roles);
        user.token = token;
        // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        this.user.next(user);
        // this.autoLogout(user.expirationAt - (new Date()).getTime());
        localStorage.setItem('userData', JSON.stringify(user));
    }

    /**xử lý lỗi khi đăng nhập */
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage: string;
        if (errorRes.error) {
            console.log(errorRes.error.code);
            errorMessage = errorRes.error.message;
        } else {
            errorMessage = 'An unknown error occurred!';
        }
        return throwError(errorMessage);
    }

    //lấy từ class User
    parseJwt(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64));//không cần parse unicode
        // const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        //   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        // }).join(''));

        return JSON.parse(jsonPayload);
    };
}