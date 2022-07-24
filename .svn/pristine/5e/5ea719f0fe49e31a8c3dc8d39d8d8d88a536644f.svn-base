package model;

/**
 * Lưu kết quả chạy lệnh SQL. Phải làm class này vì id của bảng dạng string còn
 * mã trạng thái chạy lệnh dạng số, id có thể là string biểu diễn số âm. Nếu id
 * dạng số tạo từ sequence thì có thể đảm bảo phân biệt được mã trạng thái và
 * id.
 *
 * @author toanlh-10
 */
public class ResultSQL<T> {

    public static final int RETURN_CODE_HAS_AUTHOR = 1;//Có quyền, khi kiểm tra quyền
    public static final int RETURN_CODE_HAS_NOT_AUTHOR = -1;//Không có quyền, khi kiểm tra quyền

    public static final int RETURN_CODE_SUCCESS = 0;
    /**
     * Trường hợp insert, delete không bản ghi
     */
    public static final int RETURN_CODE_SUCCESS_WITHOUT_CHANGE = -100;

    public static final int RETURN_CODE_ERROR_OTHER = -1;
    public static final int RETURN_CODE_FAIL_MISSING_INFO = -2;
    public static final int RETURN_CODE_UNAUTHORIZED = -3;
    public static final int RETURN_CODE_FAIL_ENTITY_EXISTS = -4;
    public static final int RETURN_CODE_INVALID_ARGS = -5;
    public static final int RETURN_CODE_FAIL_LOGIC = -6;
    public static final int RETURN_CODE_FAIL_ENTITY_NOT_EXISTS = -7;

    private int resultCode;
    private T result;

    public ResultSQL(int resultCode, T result) {
        this.resultCode = resultCode;
        this.result = result;
    }

    public ResultSQL() {
    }

    public int getResultCode() {
        return resultCode;
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }
}
