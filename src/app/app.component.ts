import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { User } from './login/user.model';
import { SidebarService } from './sidebar/sidebar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User;
  loggedIn = false;
  sidebarCollapsed: boolean = false;//đánh dấu ẩn hiện side bar
  constructor(private loginService: LoginService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {

    this.sidebarService.sidebarCollapsed.subscribe((isCollapsed) => {
      this.sidebarCollapsed = isCollapsed;
      this.loginService.user.subscribe((user) => {
        this.user = user;
      });
    });
    this.loginService.autoLogin();

    this.loginService.user.subscribe(user => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  getRoles() {
    if (this.user.roles == "ADMIN") {
      return true;
    } else return false;
    // return 'admin';
  }
}
