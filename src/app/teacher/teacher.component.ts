import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaggingService } from '../pagging/pagging.service';
import { SubjectsModel } from '../shared/model/subjects.model';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  subjects: SubjectsModel[] = [];
  closeModalResult = '';
  editSubject: SubjectsModel;

  constructor(
    private paggingService: PaggingService,
    private modalService: NgbModal,
    private router: Router,
    private teacherService: TeacherService,
  ) { }

  @ViewChild('modalCreate', { static: true }) modalCreate: ElementRef;
  @ViewChild('modalEdit', { static: true }) modalEdit: ElementRef;

  ngOnInit(): void {
    this.teacherService.requestSearch()
      .subscribe((results) => {
        // console.log(results)
        this.subjects = results;
      });
  }

  onManageStudent(id: string) {
    this.router.navigate(['teacher/' + id])
    // this.router.navigate(['admin/' + sidebar.id + '/teacher']);//hoặc path '/project'
    // this.active = sidebar.name;
  }


  openModalCreate() {
    this.modalService.open(this.modalCreate, {})
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
    const subjectsModel = new SubjectsModel();
    subjectsModel.subjectCode = form.value.subjectCode;
    subjectsModel.subjectName = form.value.subjectName;
    subjectsModel.groupCode = form.value.groupCode;
    subjectsModel.credit = form.value.credit;
    subjectsModel.fee = form.value.fee;
    console.log(subjectsModel);
    this.teacherService.requestCreate(subjectsModel).subscribe(
      result => {
        console.log("k loi")
        // this.teacherService.requestSearch()
        //   .subscribe((results) => {
        //     this.subjects = results;
        //   });
      }
    )
  }

  onManageEdit(subjectsModel: SubjectsModel) {
    this.editSubject = subjectsModel;
    this.modalService.open(this.modalEdit, {})
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

  onEdit(form: NgForm) {
    this.editSubject.groupCode = form.value.groupCode;
    this.editSubject.subjectCode = form.value.subjectCode;
    this.editSubject.subjectName = form.value.subjectName;
    this.editSubject.credit = form.value.credit;
    this.editSubject.fee = form.value.fee;
    this.teacherService.requestCreate(this.editSubject).subscribe(
      result => {
        this.teacherService.requestSearch().subscribe(
          result => {
            this.subjects = result;
            this.modalService.dismissAll(this.modalEdit)
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
