import { Component, OnInit } from '@angular/core';
import { PaggingModel } from '../shared/model/pagging.model';
import { PaggingService } from './pagging.service';

@Component({
  selector: 'app-pagging',
  templateUrl: './pagging.component.html',
  styleUrls: ['./pagging.component.css']
})
export class PaggingComponent implements OnInit {

  numPaggingButton: number = 5;//số lượng nút phân trang tối đa
  minPage = 1;//trang nhỏ nhất trong danh sách nút phân trang
  flag: boolean;
  perPage: any;
  paggingModel: PaggingModel;

  constructor(private paggingService: PaggingService) {
    this.paggingModel = this.paggingService.pagging.getValue();
    // this.paggingModel.countRow = 150;//test
    // this.paggingModel.currentPage = 1;
  }

  /**get max page number in list of page numbers */
  getMaxPage(): number {
    return Math.min(this.minPage + this.numPaggingButton - 1, this.paggingModel.countPage);
  }

  /** xử lý sự kiện ấn vào các loại nút thay đổi trang */
  pageAction(action: any) {
    if (action === '<') {
      this.paggingModel.currentPage--;
    } else if (action === '>') {
      this.paggingModel.currentPage++;
    } else if (action === '<<') {
      this.paggingModel.currentPage = 1;
    } else if (action === '>>') {
      this.paggingModel.currentPage = this.paggingModel.countPage;
    } else {//xử lý ấn nút số
      this.paggingModel.currentPage = +action;
    }
    
    this.minPage = this.paggingModel.currentPage - Math.floor(this.numPaggingButton / 2);

    if (this.getMaxPage() - this.minPage + 1 < this.numPaggingButton) {//trường hợp bên phải trang được chọn có quá ít nút thì phải bổ sung sang bên trái để đủ số lượng this.numPaggingButton
      this.minPage = this.paggingModel.currentPage - Math.floor(this.numPaggingButton / 2) - (this.numPaggingButton - (this.getMaxPage() - this.minPage + 1));
    }
    if (this.minPage < 1) {//trường hợp bên trái trang được lựa chọn có quá ít nút
      this.minPage = 1;
    }

    this.paggingService.pagging.next(this.paggingModel);
  }

  /**
   *
   * @param a so luong phan tu moi trang
   */
  onChangeRowPerPage(a: number): void {
    this.perPage = a + '/Page';
    this.paggingModel = new PaggingModel(a);
  }

  ngOnInit() {
    // this.paggingService.pagging.subscribe(paggingModel => {
    //   this.paggingModel = paggingModel;
    // });
  }
}
