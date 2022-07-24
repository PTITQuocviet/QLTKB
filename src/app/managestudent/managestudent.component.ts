import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageStudentModel } from './managestudent.model';
import { ManageStudentService } from './managestudent.service';

@Component({
  selector: 'app-managestudent',
  templateUrl: './managestudent.component.html',
  styleUrls: ['./managestudent.component.css']
})
export class ManagestudentComponent implements OnInit {

  closeModalResult = '';
  isAttendance = true;
  isEditPont = true;
  editPoint = new ManageStudentModel();
  listAttend: ManageStudentModel[] = [];

  manageStudents: ManageStudentModel[] = [];

  @ViewChild('modalEditPoint', { static: true }) modalEditPoint: ElementRef;
  // route: any;

  constructor(
    private modalService: NgbModal,
    private manageStudentService: ManageStudentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // console.log(this.route.params)
    // console.log(this.route.snapshot.params)
    this.route.params.subscribe(
      result => {
        this.manageStudentService.requestSearch(result['idClass'])
          .subscribe(
            result => {
              this.manageStudents = result;
              let i = 0;
              for (let managestudent of this.manageStudents) {
                // this.listAttend[i].studentId = managestudent.studentId;
                // this.listAttend[i].diemdanh = 1;
                managestudent.isAttend = true;
              }
            });
      }
    )
  }

  onpenModalEditPont(manageStudent: ManageStudentModel) {
    this.editPoint.subjectCode = this.route.snapshot.params['idClass'];
    this.editPoint.studentId = manageStudent.studentId;
    this.editPoint.diligence = manageStudent.diligence;
    this.editPoint.middlePoint = manageStudent.middlePoint;
    this.editPoint.finalPoint = manageStudent.finalPoint;
    this.modalService.open(this.modalEditPoint, {})
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
   * Lấy danh sách project khi tạo user
   * @param project 
   * @param event 
   */
  onCheckBoxChange(event: Event, manageStudent: ManageStudentModel) {
    // if ((<HTMLInputElement>event.target).checked) {
    //   manageStudent.isAttend = 1;
    // } else {
    //   manageStudent.isAttend = 0;
    // }
  }

  onSavePoint() {
    this.manageStudentService.requestSavePoint(this.editPoint).subscribe(
      result => {
        this.manageStudentService.requestSearch(this.route.snapshot.params['idClass'])
          .subscribe(
            result => {
              this.manageStudents = result;
              for (let managestudent of this.manageStudents) {
                managestudent.isAttend = true;
              }
            });
        this.modalService.dismissAll(this.modalEditPoint);
      }
    )
  }

  onSave() {
    // console.log(this.manageStudents);
    this.manageStudentService.requestSave(this.manageStudents).subscribe(
      result => {
        this.isAttendance = !this.isAttendance;
        // this.modalService.dismissAll()
      }
    )
    // this.isAttendance = !this.isAttendance;
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
