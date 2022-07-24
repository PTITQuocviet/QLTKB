package dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.ResultSQL;
import model.web.ResultPagging;
import model.web.SearchParam;

/**
 * @author toanlh-10
 */
public abstract class GenericDAO<T> {

    /**
     * chuyển đổi kết quả truy vấn lấy dữ liệu T thành object T
     */
    protected abstract T resultSetToObject(ResultSet resultSet) throws SQLException;

    /**
     * chuyển đổi kết quả truy vấn lấy kết quả trạng thái truy vấn. Chỉ dùng cái
     * này nếu resultSetToObject không trả ra kết quả vì có lỗi.
     */
    protected int resultSetToQueryStatus(ResultSet resultSet) throws SQLException {
        return resultSet.getInt("result_code");
    }

    /**
     * Tìm kiếm danh sách có phân trang
     */
    public abstract ResultSQL<ResultPagging<T>> search(Connection connection, SearchParam searchParam) throws SQLException;

    /**
     * Tìm kiếm thông tin chi tiết theo ID
     */
    public abstract ResultSQL<T> get(Connection connection, T t) throws SQLException;

    /**
     * @return object chứa ID của thực thể mới tạo
     */
    public abstract ResultSQL<T> insert(Connection connection, T t) throws SQLException;

    /**
     * @return {@link RETURN_CODE_SUCCESS} nếu thành công.
     */
    public abstract ResultSQL<T> update(Connection connection, T t) throws SQLException;

    /**
     * @return {@link RETURN_CODE_SUCCESS} nếu thành công.
     */
    public abstract ResultSQL<T> delete(Connection connection, T t) throws SQLException;
}
