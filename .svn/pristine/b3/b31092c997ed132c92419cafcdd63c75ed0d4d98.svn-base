package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.LinkedList;
import java.util.List;
import model.Dataset;
import model.ResultSQL;
import model.web.ResultPagging;
import model.web.SearchParam;
import model.web.SearchParamDataset;
import org.apache.log4j.Logger;

/**
 *
 * @author AN LE
 */
public class DatasetDAO extends GenericDAO<Dataset> {
    
    private final Logger LOGGER = Logger.getLogger(DatasetDAO.class);

    @Override
    public ResultSQL<ResultPagging<Dataset>> search(Connection connection, SearchParam searchParam) throws SQLException {
        SearchParamDataset searchParamDataset = (SearchParamDataset) searchParam;
        ResultPagging<Dataset> resultPagging = new ResultPagging<>();
        PreparedStatement stm = connection.prepareStatement(
                "call prc_search_dataset(@p_prj_id := ?, @p_dataset_id := ?, @p_stg := ?, @p_start := ?, @p_row := ?)"
        );

        stm.setString(1, searchParamDataset.getPrjId());
        stm.setString(2, searchParamDataset.getId());
        stm.setString(3, searchParamDataset.getProgress());
        
        //todo thêm tham số tìm kiếm khác
        stm.setInt(4, searchParam.getStart());
        stm.setInt(5, searchParam.getRows());

        ResultSet resultSet = stm.executeQuery();
        List<Dataset> datasets = new LinkedList<>();
        int numFound = 0;
        while (resultSet.next()) {
            Dataset dataset = new Dataset();
            dataset.setPrjId(resultSet.getString("prj_id"));
            dataset.setId(resultSet.getString("dataset_id"));
            dataset.setProgress(resultSet.getString("stg"));

            datasets.add(dataset);
            if (numFound == 0) {
                numFound = resultSet.getInt("num_found");
            }
        }

        resultPagging.setResults(datasets);
        resultPagging.setStart(searchParam.getStart());
        resultPagging.setNumFound(numFound);

        return new ResultSQL(ResultSQL.RETURN_CODE_SUCCESS, resultPagging);
    }

    @Override
    public ResultSQL<Dataset> get(Connection connection, Dataset t) throws SQLException {
        SearchParamDataset searchParam = new SearchParamDataset();
        searchParam.setId(t.getId());
        searchParam.setStart(0);
        searchParam.setRows(1);

        ResultPagging<Dataset> resultPagging = search(connection, searchParam).getResult();

        List<Dataset> results = resultPagging.getResults();
        if (results == null || results.isEmpty()) {
            return null;
        }

        return new ResultSQL(ResultSQL.RETURN_CODE_SUCCESS, results.get(0));
    }

    @Override
    public ResultSQL<Dataset> insert(Connection connection, Dataset t) throws SQLException {
        Dataset ret = null;

        PreparedStatement stm = connection.prepareStatement(
                "call prc_insert_dataset(@p_prj_id := ?, @p_stg := ?, @p_strt_tm := ?, @p_end_tm := ?, @p_count_cust := ?)"
        );

        stm.setString(1, t.getPrjId()); //System.out.println(t.getPrjId() + " " + t.getId() + " " + t.getProgress());
        stm.setString(2, t.getProgress());//

        stm.setNull(3, Types.TIMESTAMP);
        stm.setNull(4, Types.TIMESTAMP);
        stm.setNull(5, Types.INTEGER);

        ResultSet resultSet = stm.executeQuery();
        try {
            if (resultSet.next()) {
                ret = resultSetToObject(resultSet);
            }
        } catch (SQLException ex) {//không phải là dữ liệu mà là trạng thái chạy thủ tục
            System.out.println("SQL ERROR: " + ex);
            return new ResultSQL(super.resultSetToQueryStatus(resultSet), null);
        }

        return new ResultSQL(ResultSQL.RETURN_CODE_SUCCESS, ret);
    }

    @Override
    public ResultSQL<Dataset> update(Connection connection, Dataset t) throws SQLException {
        Dataset ret = null;
        
        PreparedStatement stm = connection.prepareStatement(
                "call prc_update_dataset(@p_prj_id := ?, @p_dataset_id := ?, @p_stg := ?, @p_strt_tm := ?, @p_end_tm := ?, @p_count_cust := ?)"
        );
        
        LOGGER.info("updating dataset id: " + t.getId() + " of project: " + t.getPrjId());
        stm.setString(1, t.getPrjId());
        stm.setString(2, t.getId());
        stm.setString(3, t.getProgress());
        stm.setNull(4, Types.TIMESTAMP);
        stm.setNull(5, Types.TIMESTAMP);
        stm.setNull(6, Types.INTEGER);
        
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
    public ResultSQL<Dataset> delete(Connection connection, Dataset t) throws SQLException {
        Dataset ret = null;
        
        PreparedStatement stm = connection.prepareStatement(
                "call prc_delete_dataset(@p_prj_id := ?, @p_dataset_id := ?)"
        );
        
        stm.setString(1, t.getPrjId());
        stm.setString(2, t.getId());
        
        ResultSet resultSet = stm.executeQuery();
        try {
            if (resultSet.next()) {
                ret = new Dataset(resultSet.getString("prj_id"), resultSet.getString("dataset_id"));
            }
        } catch (SQLException ex) {//không phải là dữ liệu mà là trạng thái chạy thủ tục
            return new ResultSQL(super.resultSetToQueryStatus(resultSet), null);
        }
        
        return new ResultSQL(ResultSQL.RETURN_CODE_SUCCESS, ret);
    }
    
    @Override
    protected Dataset resultSetToObject(ResultSet resultSet) throws SQLException {
        Dataset dataset = new Dataset();
        dataset.setPrjId(resultSet.getString("prj_id"));
        dataset.setId(resultSet.getString("dataset_id"));
        dataset.setProgress(resultSet.getString("stg"));

        return dataset;

    }
}
