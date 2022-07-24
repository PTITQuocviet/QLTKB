import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-yes-no',
  templateUrl: './modal-yes-no.component.html',
  styleUrls: ['./modal-yes-no.component.css']
})

export class ModalYesNoComponent implements OnInit {

  @Input('title') title: string;
  @Input('message') message: string;
  @Output() btnCode = new EventEmitter<{ btnCode: number }>();//code list, 1: yes, 2: no, 3: close

  constructor(
    private modalService: NgbModal,
  ) {

  }

  ngOnInit() { }

  alertWithSuccess() {
    Swal.fire({
      title: this.title,
      text: this.message,
      icon: 'warning',
      showDenyButton: true, // hiện button "No"
      denyButtonColor: '#00CCD6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.btnCode.emit({ btnCode: 1 }),
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          )
      }
    });
  }
}