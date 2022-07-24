import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaggingService } from '../pagging/pagging.service';
import { StudentService } from './student.service';
import { SubjectsModel } from "../shared/model/subjects.model";
import { ListTeacherModel, PointModel } from "./student.model";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {

  subjects: SubjectsModel[] = [];
  showSubjects: SubjectsModel[] = [];
  listTeacher: ListTeacherModel[] = [];
  search: string
  point = new PointModel();
  search$ = new Subject<string>();
  destroy$ = new Subject();
  closeModalResult = '';
  constructor(
    private paggingService: PaggingService,
    private modalService: NgbModal,
    private studentService: StudentService,
  ) { }

  @ViewChild('modalListTeacher', { static: true }) modalListTeacher: ElementRef;
  @ViewChild('modalIngredientPoints', { static: true }) modalIngredientPoints: ElementRef;

  ngOnInit(): void {
    this.studentService.requestSearch()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.subjects = this.showSubjects = results;
      });
    this.search$.asObservable()
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),// k nhận giá trị đã truyền vào
        debounceTime(200),// độ trễ 0.2s
      )
      .subscribe({
        next: result => {
          this.showSubjects = this.subjects.filter(item => item.subjectName.includes(result));
        }
      })

  }


  options = [
    { value: "Small", selected: false },
    { value: "Medium", selected: false },
    { value: "Large", selected: false }
  ];

  selectedUser: any;
  filterdOptions = [];
  filterUsers() {
    this.filterdOptions = this.options.filter(
      item => item.value.toLowerCase().includes(this.selectedUser.toLowerCase())
    );
    console.log(this.filterdOptions);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete()
  }
  onSearch(event: KeyboardEvent) {
    this.search$.next((event.target as HTMLInputElement).value);
  }
  /**
   * Mở modal xem danh sách giảng viên
   */
  openModalListTeacher(id: string) {
    this.studentService.requestSearchTeacher(id)
      .subscribe((results) => {
        this.listTeacher = results;
      });
    this.modalService.open(this.modalListTeacher, {})
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
   * Xem điểm thành phần
   */
  openModalIngredientPoints(code: string) {
    this.studentService.requestSearchPoint(code)
      .subscribe((results) => {
        this.point = results;
      });
    this.modalService.open(this.modalIngredientPoints, {})
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
