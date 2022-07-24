package control;

import dao.DatasetDAO;
import dao.GenericDAO;
import dao.ProjectDAO;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import model.Dataset;
import model.MachineLearningType;
import model.Project;
import model.ResultSQL;
import model.User;
import model.web.ResultPagging;
import model.web.SearchParam;
import model.web.SearchParamDataset;
import model.web.SearchParamProject;
import org.apache.log4j.Logger;

public class DatabaseHandler {

    private final Logger LOGGER = Logger.getLogger(DatabaseHandler.class);

    private final ConnectionPool connectionPool;

    private final ProjectDAO projectDAO;
    private final DatasetDAO datasetDAO;

    // https://stackoverflow.com/questions/2299469/how-should-i-connect-to-jdbc-database-datasource-in-a-servlet-based-applicatio
    public DatabaseHandler() {
        projectDAO = new ProjectDAO();
        datasetDAO = new DatasetDAO();

        connectionPool = new ConnectionPool();
    }

    public boolean isUserActive(User userSearch) {
        return true;
    }

    /**
     * Tìm user theo ID hoặc tên, ưu tiên tìm theo ID nếu ID {@code> 0}.
     *
     * @param userSearch user cần tìm kiếm có ID hoặc username trùng với
     * {@code userSearch}. {@code userSearch} không bị thay đổi giá trị.
     * @return null nếu không tìm thấy user. Return object user mới nếu tìm thấy
     */
    public User getUser(User userSearch) {
        User user = new User();
        user.setFullname("Lê Huy Toàn");
        user.setStatus(User.USER_STATUS_ACTIVE);
        user.setUsername("ToanLH");
        return user;
    }

    private <T> T get(T t, GenericDAO<T> dao) {
        T ret = null;

        try (Connection connection = connectionPool.getConnection()) {
            ResultSQL<T> resultSQL = dao.get(connection, t);

            if (resultSQL.getResultCode() == ResultSQL.RETURN_CODE_SUCCESS) {
                ret = resultSQL.getResult();
            }
        } catch (SQLException ex) {
            LOGGER.error("get " + t.toString(), ex);
        }

        return ret;
    }

    private <T> ResultPagging<T> search(SearchParam searchParam, GenericDAO<T> dao) {
        if (searchParam == null) {
            throw new IllegalArgumentException("Thiếu tham số tìm kiếm");
        }
        //TODO gọi thủ tục tìm kiếm project, trả về ResultPagging
        ResultPagging resultPagging = null;
        try (Connection connection = connectionPool.getConnection()) {
            ResultSQL<ResultPagging<T>> resultSQL = dao.search(connection, searchParam);

            if (resultSQL.getResultCode() == ResultSQL.RETURN_CODE_SUCCESS) {
                resultPagging = resultSQL.getResult();
            }
        } catch (SQLException ex) {
            LOGGER.error("", ex);
        }

        return resultPagging;
    }

    private <T> T create(T t, GenericDAO<T> dao) {
        T ret = null;
        try (Connection connection = connectionPool.getConnection()) {
            connection.setAutoCommit(false);
            ResultSQL<T> resultSQL = dao.insert(connection, t);

            if (resultSQL.getResultCode() == ResultSQL.RETURN_CODE_SUCCESS) {
                ret = resultSQL.getResult();
                connection.commit();
            } else {
                connection.rollback();
            }
        } catch (SQLException ex) {
            LOGGER.error("Error SQL", ex);
        }

        return ret;
    }

    private <T> T update(T t, GenericDAO<T> dao) {
        T ret = null;
        try (Connection connection = connectionPool.getConnection()) {
            connection.setAutoCommit(false);
            ResultSQL<T> resultSQL = dao.update(connection, t);

            if (resultSQL.getResultCode() == ResultSQL.RETURN_CODE_SUCCESS) {
                ret = resultSQL.getResult();
                connection.commit();
            } else {
                connection.rollback();
            }
        } catch (SQLException ex) {
            LOGGER.error("", ex);
        }

        return ret;
    }

    private <T> T delete(T t, GenericDAO<T> dao) {
        T ret = null;
        try (Connection connection = connectionPool.getConnection()) {
            connection.setAutoCommit(false);
            ResultSQL<T> resultSQL = dao.delete(connection, t);

            if (resultSQL.getResultCode() == ResultSQL.RETURN_CODE_SUCCESS) {
                ret = resultSQL.getResult();
                connection.commit();
            } else {
                connection.rollback();
            }
        } catch (SQLException ex) {
            LOGGER.error("", ex);
        }

        return ret;
    }

    /**
     * Lấy thông tin chi tiết 1 project, có thể có nhiều thông tin hơn so với
     * api tìm danh sách project.
     *
     * @return null nếu không tìm thấy.
     */
    public Project getProject(Project projectSearch) {
        return get(projectSearch, projectDAO);
    }

    /**
     *
     * @param searchProjectParam
     * @return
     */
    public ResultPagging<Project> searchProjects(SearchParamProject searchParamProject) {
        return search(searchParamProject, projectDAO);
    }

    /**
     * Tạo project mới.
     *
     * @param newProject
     * @return id của project mới tạo
     */
    public Project createProject(Project newProject) {
        return create(newProject, projectDAO);
    }

    /**
     * Tạo project mới.
     *
     * @param newProject
     * @return id của project mới tạo
     */
    public Project updateProject(Project newProject) {
        return update(newProject, projectDAO);
    }

    /**
     * Tạo project mới.
     *
     * @param newProject
     * @return id của project mới tạo
     */
    public Project deleteProject(Project newProject) {
        return delete(newProject, projectDAO);
    }

    public Dataset getDataset(Dataset datasetSearch) {
        return get(datasetSearch, datasetDAO);
    }

    public ResultPagging<Dataset> searchDatasets(SearchParamDataset searchParamDataset) {
        return search(searchParamDataset, datasetDAO);
    }

    public Dataset createDataset(Dataset newDataset) {
        return create(newDataset, datasetDAO);
    }

    public Dataset updateDataset(Dataset newDataset) {
        return update(newDataset, datasetDAO);
    }
    
    public Dataset deleteDataset(Dataset newDataset) {
        return delete(newDataset, datasetDAO);
    }
}
