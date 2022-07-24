import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { AccountModel } from 'src/app/shared/model/account.model';
import { SidebarService } from 'src/app/sidebar/sidebar.service';
import { CenterStudentModel } from './center-student.model';
import { CenterStudentService } from './center-student.service';

@Component({
  selector: 'app-center-student',
  templateUrl: './center-student.component.html',
  styleUrls: ['./center-student.component.css']
})
export class CenterStudentComponent implements OnInit {

  centerStudents: CenterStudentModel[] = [];
  closeModalResult = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private CenterStudentService: CenterStudentService,
    private sidebarService: SidebarService,
  ) { }

  @ViewChild('modalCreateStudent', { static: true }) modalCreateStudent: ElementRef;




  ngOnInit(): void {
    this.route.params.subscribe(
      result => {
        this.CenterStudentService.requestSearch(this.route.snapshot.params['idcenter']).subscribe(
          result => {
            this.centerStudents = result;
          }
        )
      }
    )

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

  /**
     * change tab
     * @param tabName tab name
     */
  onChangeTab(tabName: string) {
    if (tabName === 'teacher') {
      this.router.navigate(['admin', this.route.snapshot.params['idcenter'], 'teacher']);
    } else if (tabName === 'student') {
      this.router.navigate(['admin', this.route.snapshot.params['idcenter'], 'student']);
    }
  }

  onCreateStudent(form: NgForm) {
    const account = new AccountModel();
    account.firstName = form.value.firstName;
    account.lastName = form.value.lastName;
    account.email = form.value.email;
    account.password = form.value.password;
    account.address = form.value.address;
    account.phoneNumber = form.value.phoneNumber;
    account.centerId = this.route.snapshot.params['idcenter'];
    account.role = 2;
    console.log(account);
    this.CenterStudentService.requestUpdate(account).subscribe(
      result => {
        this.CenterStudentService.requestSearch(this.route.snapshot.params['idcenter']).subscribe(
          result => {
            this.centerStudents = result;
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
