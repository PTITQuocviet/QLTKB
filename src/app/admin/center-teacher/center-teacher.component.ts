import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { AccountModel } from 'src/app/shared/model/account.model';
import { SidebarService } from 'src/app/sidebar/sidebar.service';
import { CenterTeacherModel } from './center-teacher.model';
import { CenterTeacherService } from './center-teacher.service';

@Component({
  selector: 'app-center-teacher',
  templateUrl: './center-teacher.component.html',
  styleUrls: ['./center-teacher.component.css']
})
export class CenterTeacherComponent implements OnInit {

  closeModalResult = '';

  centerTeachers: CenterTeacherModel[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CenterTeacherService: CenterTeacherService,
    private sidebarService: SidebarService,
    private modalService: NgbModal,
  ) { }

  @ViewChild('modalCreateStudent', { static: true }) modalCreateStudent: ElementRef;

  ngOnInit(): void {
    this.route.params.subscribe(
      result => {
        this.CenterTeacherService.requestSearch(result['idcenter']).subscribe(
          result => {
            this.centerTeachers = result;
          }
        )
      }
    )
  }

  /**
     * change tab
     * @param tabName tab name
     */
  onChangeTab(tabName: string) {
    // console.log(this.route.snapshot.params)
    if (tabName === 'teacher') {
      this.router.navigate(['admin', this.route.snapshot.params['idcenter'], 'teacher']);
    } else if (tabName === 'student') {
      this.router.navigate(['admin', this.route.snapshot.params['idcenter'], 'student']);
    }
  }

  openModalCreate() {
    this.modalService.open(this.modalCreateStudent, {})
      .result
      .then(
        (result) => {//Closed
          console.log(result);
          if (result === 'create') {//không dùng
          }
        }, (reason) => {//Dismissed
          this.closeModalResult = `Dismissed ${this.getDismissModalReason(reason)}`;
          console.log(this.closeModalResult);
        });
  }

  onCreate(form: NgForm) {
    const account = new AccountModel();
    account.firstName = form.value.firstName;
    account.lastName = form.value.lastName;
    account.email = form.value.email;
    account.password = form.value.password;
    account.address = form.value.address;
    account.phoneNumber = form.value.phoneNumber;
    account.centerId = this.route.snapshot.params['idcenter'];
    account.role = 1;
    console.log(account);
    this.CenterTeacherService.requestUpdate(account).subscribe(
      result => {
        this.CenterTeacherService.requestSearch(this.route.snapshot.params['idcenter']).subscribe(
          result => {
            this.centerTeachers = result;
          }
        )
        this.modalService.dismissAll(this.modalCreateStudent)
      }
    )
  }

  private getDismissModalReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
