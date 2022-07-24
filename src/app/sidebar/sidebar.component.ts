import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { CenterStudentService } from '../admin/center-student/center-student.service';
import { CenterTeacherService } from '../admin/center-teacher/center-teacher.service';
import { SidebarModel, SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebars: SidebarModel[] = [];
  closeModalResult = '';
  idcenter: string;
  sidebarCollapsed: boolean = false;//đánh dấu ẩn hiện side bar
  active: string;

  menuSystemCollapsed: boolean = false;//thuộc danh sách trước khi chọn project
  menuDataCollapsed: boolean = false;//thuộc danh sách sau khi chọn project

  projectId: string;//nếu là các trang khi chưa chọn project thì giá trị null. Nếu là trang sau khi chọn project thì giá trị là prj_id ở url

  isMenuProject = true;//menu có 2 danh sách. Danh sách trước khi chọn project (mặc định sau khi đăng nhập) và danh sách sau khi chọn project

  @ViewChild('modalCreateCenter', { static: true }) modalCreateCenter: ElementRef;

  constructor(
    private sidebarService: SidebarService
    , private route: ActivatedRoute
    , private router: Router
    , private modalService: NgbModal
    , private centerTeacherService: CenterTeacherService
    , private centerStudentService: CenterStudentService

  ) { }

  ngOnInit(): void {

    this.sidebarService.requestSearch().subscribe(
      result => {
        this.sidebars = result;
        this.active = this.sidebars[0].name;
      }
    )

    this.sidebarService.sidebarCollapsed.subscribe((isCollapsed) => {
      this.sidebarCollapsed = isCollapsed;
    });
  }

  oncheck(sidebar: SidebarModel) {
    this.router.navigate(['admin/' + sidebar.id + '/teacher']);//hoặc path '/project'
    this.active = sidebar.name;
  }

  openModalCreate() {
    this.modalService.open(this.modalCreateCenter, {})
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

  onCreateCenter(form: NgForm) {
    const sidebarModel = new SidebarModel();
    sidebarModel.name = form.value.name;
    sidebarModel.address = form.value.address;
    sidebarModel.branch = form.value.branch;
    console.log(sidebarModel);
    this.sidebarService.requestUpdate(sidebarModel).subscribe(
      result => {
        this.sidebarService.requestSearch().subscribe(
          result => {
            this.sidebars = result;
            this.modalService.dismissAll(this.modalCreateCenter)
          }
        )
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
