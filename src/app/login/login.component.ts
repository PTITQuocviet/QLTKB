import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  error: string = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
    const user = this.loginService.user.getValue();
    if (user) {//đã đăng nhập thành công thì khác null
      this.router.navigate(['/']);//đã đăng nhập rồi thì không hiển thị trang đăng nhập
    }
  }

  onSubmitLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;

    this.loginService.login(username, password).subscribe(
      resData => {
        // console.log(resData)
        if (resData.roles == "ADMIN") {
          this.isLoading = false;
          this.sidebarService.requestSearch().subscribe(
            result => {
              this.router.navigate(['admin/' + result[0].id + '/teacher']);//hoặc path '/project'
            }
          )
        }

        if (resData.roles == "TEACHER") {
          this.router.navigate(['teacher']);//hoặc path '/project'
        }
        if (resData.roles == "STUDENT") {
          this.router.navigate(['student']);//hoặc path '/project'
        }
      },
      errorMessage => {
        console.log(errorMessage);//login service có pipe error để chỉ output errorMessage dạng string
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    // form.reset();//có thể làm cái khác reset
  }
}
