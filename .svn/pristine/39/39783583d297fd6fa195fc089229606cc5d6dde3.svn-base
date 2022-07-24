package model.web;

import jakarta.ws.rs.QueryParam;
import java.util.Date;

/**
 * Lưu thông tin để tìm kiếm project.
 *
 * @author toanlh-10
 */
public class SearchParamProject extends SearchParam {

    @QueryParam("id")
    private String id;
    @QueryParam("name")
    private String name;
    @QueryParam("status")
    private Integer status;
    @QueryParam("createdUser")
    private String createdUser;
    @QueryParam("createdTime")
    private Date createdTime;
    /**
     * Mã loại machine learning {@link MachineLearningType.MACHINE_LEARNING_TYPE_CLASSIFICATION},  {@link MachineLearningType.MACHINE_LEARNING_TYPE_REGRESSION},  {@link MachineLearningType.MACHINE_LEARNING_TYPE_CLUSTERING}
     */
    @QueryParam("mlType")
    private String mlType;

    public SearchParamProject(String id) {
        this.id = id;
    }

    public SearchParamProject() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCreatedUser() {
        return createdUser;
    }

    public void setCreatedUser(String createdUser) {
        this.createdUser = createdUser;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public String getMlType() {
        return mlType;
    }

    public void setMlType(String mlType) {
        this.mlType = mlType;
    }

    @Override
    public String toString() {
        return "SearchParamProject{" + "id=" + id + ", name=" + name + ", status=" + status + ", createdUser=" + createdUser + ", createdTime=" + createdTime + ", mlType=" + mlType + '}';
    }
}
