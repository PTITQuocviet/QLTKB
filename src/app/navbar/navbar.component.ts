import { User } from './../login/user.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login/login.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaggingModel } from '../shared/model/pagging.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User;
  isManageProjectPage: boolean;
  private sidebarCollapsed: boolean;
  isBack: boolean = false;
  flag: boolean = false;
  href: string = '';
  arrayUrl: string[];

  nameUrl: string = '';
  searchText = '';

  @ViewChild('formFilter') formFilter: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
    this.sidebarService.sidebarCollapsed.subscribe((isCollapsed) => {
      this.sidebarCollapsed = isCollapsed;

      this.loginService.user.subscribe((user) => {
        this.user = user;
      });
    });

    this.route.url.subscribe((url) => {
      if (url.length === 1 && url[0].path === 'project') {
        this.isManageProjectPage = true;
      } else {
        this.isManageProjectPage = false;
      }
    });

    // auto search
    this.flag = true;

    let pagging = new PaggingModel(500);
  }

  toogleSidebar(event: Event) {
    event.preventDefault();
    this.sidebarService.sidebarCollapsed.next(!this.sidebarCollapsed);
  }

  onLogout() {
    this.loginService.logout();
  }

  getUser() {
    return this.user.username;
    // return 'admin';
  }

  backProject() {
    // this.router.navigate(['/project']);
    this.router.navigateByUrl('/project');
  }

  // get id on url
  getId() {
    this.href = this.router.url;
    this.arrayUrl = this.href.split('/');
    return this.arrayUrl[2];
  }

}
