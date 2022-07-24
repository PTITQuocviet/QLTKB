package model.web;

import java.util.List;

/**
 * Thông tin kết quả tìm kiếm và các thông tin liên quan đến phân trang.
 *
 * @author toanlh-10
 */
public class ResultPagging<T> {

    /**
     * Số lượng kết quả tìm thấy.
     */
    private int numFound;
    /**
     * index của phần tử kết quả đầu tiên trong danh sách kết quả tìm thấy. Giá trị
     * nhỏ nhất là 0.
     */
    private int start;
    /**
     * danh sách kết quả trả về.
     */
    private List<T> results;

    public ResultPagging(int numFound, int start, List<T> results) {
        this.numFound = numFound;
        this.start = start;
        this.results = results;
    }
 
    public ResultPagging() {
    }

    public int getNumFound() {
        return numFound;
    }

    public void setNumFound(int numFound) {
        this.numFound = numFound;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public List<T> getResults() {
        return results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }
}
