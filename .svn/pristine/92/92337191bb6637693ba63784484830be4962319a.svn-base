package dao;

import api.filter.AuthenticationFilter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import model.MachineLearningType;
import model.Project;
import model.ResultSQL;
import model.web.ResultPagging;
import model.web.SearchParam;
import model.web.SearchParamProject;
import org.apache.log4j.Logger;

/**
 *
 * @author toanlh-10
 */
public class ProjectDAO extends GenericDAO<Project> {
    
    private final Logger LOGGER = Logger.getLogger(ProjectDAO.class);
    
    @Override
    public ResultSQL<ResultPagging<Project>> search(Connection connection, SearchParam searchParam) throws SQLException {
        SearchParamProject searchParamProject = (SearchParamProject) searchParam;
        ResultPagging<Project> resultPagging = new ResultPagging<>();
        PreparedStatement stm = connection.prepareStatement(
                "call prc_search_project(@p_prj_id := ?, @p_prj_nm := ?, @p_act := ?, @p_owner := ?, @p_start := ?, @p_row := ?)"
        );
        
        stm.setString(1, searchParamProject.getId());
        stm.setString(2, searchParamProject.getName());
        if (searchParamProject.getStatus() == null) {
            stm.setNull(3, Types.INTEGER);
        } else {
            stm.setInt(3, searchParamProject.getStatus());
        }
        stm.setString(4, searchParamProject.getCreatedUser());
        //todo thêm tham số tìm kiếm khác
        stm.setInt(5, searchParam.getStart());
        stm.setInt(6, searchParam.getRows());
        
        ResultSet resultSet = stm.executeQuery();
        List<Project> projects = new LinkedList<>();
        int numFound = 0;
        while (resultSet.next()) {
            projects.add(resultSetToObject(resultSet));
            if (numFound == 0) {
                numFound = resultSet.getInt("num_found");
            }
        }
        
        resultPagging.setResults(projects);
        resultPagging.setStart(searchParam.getStart());
        resultPagging.setNumFound(numFound);
        
        return new ResultSQL(ResultSQL.RETURN_CODE_SUCCESS, resultPagging);
    }
    
    @Override
    public ResultSQL<Project> get(Connection connection, Project t) throws SQLException {
        SearchParamProject searchParam = new SearchParamProject();
        searchParam.setId(t.getId());
        searchParam.setStart(0);
        searchParam.setRows(1);
        
        ResultPagging<Project> resultPagging = search(connection, searchParam).getResult();
        
        List<Project> results = resultPagging.getResults();
        if (results == null || results.isEmpty()) {
            return null;
        }
        
        return new ResultSQL(ResultSQL.RETURN_CODE_SUCCESS, results.get(0));
    }
    
    @Override
    public ResultSQL<Project> insert(Connection connection, Project t) throws SQLException {
        Project ret = null;
        
        PreparedStatement stm = connection.prepareStatement(
                "call prc_insert_project(@p_prj_id := ?, @p_prj_nm := ?, @p_ml_tp := ?, @p_desciption := ?, @p_act := ?, @p_tgt_dt := ?, @p_contrib := ?, @p_owner := ?)"
        );
        
        stm.setString(1, t.getId());//TODO bỏ vì dùng db sequence
        stm.setString(2, t.getName());
        stm.setString(3, t.getMlType().getType());
        stm.setString(4, t.getDescription());
        stm.setInt(5, t.getStatus());
        stm.setNull(6, Types.TIMESTAMP);
        stm.setNull(7, Types.VARCHAR);
        stm.setString(8, "ToanLH4");
        
        ResultSet resultSet = stm.executeQuery();
        try {
            if (resultSet.next()) {
                ret = resultSetToObject(resultSet);
            }
        } catch (SQLException ex) {//không phải là dữ liệu mà là trạng thái chạy thủ tục
            return new ResultSQL(super.resultSetToQueryStatus(resultSet), null);
        }
        
        return new ResultSQL(ResultSQL.RETURN_CODE_SUCCESS, ret);
    }
    
    @Override
    public ResultSQL<Project> update(Connection connection, Project t) throws SQLException {
        Project ret = null;
        
        PreparedStatement stm = connection.prepareStatement(
                "call prc_update_project(@p_prj_id := ?, @p_prj_nm := ?, @p_ml_tp := ?, @p_desciption := ?, @p_act := ?, @p_tgt_dt := ?, @p_contrib := ?, @p_owner := ?)"
        );
        
        LOGGER.info("updating project id: " + t.getId());
        stm.setString(1, t.getId());
        stm.setString(2, t.getName());
        stm.setString(3, t.getMlType().getType());
        stm.setString(4, t.getDescription());
        stm.setInt(5, t.getStatus());
        stm.setNull(6, Types.TIMESTAMP);//p_tgt_dt
        stm.setNull(7, Types.VARCHAR);//p_contrib
        stm.setString(8, "ToanLH4");
        
        ResultSet resultSet = stm.executeQuery();
        try {
            if (resultSet.next()) {
                ret = resultSetToObject(resultSet);
            }
        } catch (SQLException ex) {//không phải là dữ liệu mà là trạng thái chạy thủ tục
            LOGGER.info(ex.getMessage());
            int status = super.resultSetToQueryStatus(resultSet);
            LOGGER.info("status: " + status);
            return new ResultSQL(status, null);
        }
        
        return new ResultSQL(ResultSQL.RETURN_CODE_SUCCESS, ret);
    }
    
    @Override
    public ResultSQL<Project> delete(Connection connection, Project t) throws SQLException {
        Project ret = null;
        
        PreparedStatement stm = connection.prepareStatement(
                "call prc_delete_project(@p_prj_id := ?)"
        );
        
        stm.setString(1, t.getId());
        
        ResultSet resultSet = stm.executeQuery();
        try {
            if (resultSet.next()) {
                ret = new Project(resultSet.getString("prj_id"));
            }
        } catch (SQLException ex) {//không phải là dữ liệu mà là trạng thái chạy thủ tục
            return new ResultSQL(super.resultSetToQueryStatus(resultSet), null);
        }
        
        return new ResultSQL(ResultSQL.RETURN_CODE_SUCCESS, ret);
    }
    
    @Override
    protected Project resultSetToObject(ResultSet resultSet) throws SQLException {
        Project project = new Project();
        project.setId(resultSet.getString("prj_id"));
        project.setName(resultSet.getString("prj_nm"));
        project.setMlType(new MachineLearningType(resultSet.getString("ml_tp")));
        project.setDescription(resultSet.getString("desciption"));
        project.setStatus(resultSet.getInt("act"));
        project.setCreatedUser(resultSet.getString("owner"));
        project.setCreatedTime(new Date(resultSet.getTimestamp("add_tstp").toInstant().getEpochSecond()));
        return project;
        
    }
}
