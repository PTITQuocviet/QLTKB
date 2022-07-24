export class PaggingModel {

    rowPerPage: number; //số lượng kết quả mỗi trang
    // countPage: number; //số lượng trang kết quả
    currentPage: number; //mã số trang hiện tại
    countRow: number;//tổng số lượng bản ghi

    constructor(rowPerPage: number) {
        this.rowPerPage = rowPerPage;
        this.currentPage = 1;
    }

    /** Tính tổng số trang */
    get countPage() {
        return Math.ceil(this.countRow / this.rowPerPage);
    }
}