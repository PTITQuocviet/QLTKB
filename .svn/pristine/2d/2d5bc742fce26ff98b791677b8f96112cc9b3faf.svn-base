package model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.ws.rs.PathParam;
import java.util.Date;
import java.util.List;

/**
 * @author toanlh-10
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Project {

    public static final int STATUS_ACTIVE = 1;
    public static final int STATUS_INACTIVE = 2;

    @PathParam("id")
    private String id;
    private String name;
    private List<String> tags;
    private String description;
    private MachineLearningType mlType;//machine learning type
    private Integer status;
    private String createdUser;
    private Date createdTime;

    public Project(String id, String name, List<String> tags, String description, MachineLearningType mlType, Integer status, String createdUser, Date createdTime) {
        this.id = id;
        this.name = name;
        this.tags = tags;
        this.description = description;
        this.mlType = mlType;
        this.status = status;
        this.createdUser = createdUser;
        this.createdTime = createdTime;
    }

    public Project(String id) {
        this.id = id;
    }

    public Project() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
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

    public MachineLearningType getMlType() {
        return mlType;
    }

    public void setMlType(MachineLearningType mlType) {
        this.mlType = mlType;
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

    @Override
    public String toString() {
        return "Project{" + "id=" + id + ", name=" + name + ", tags=" + tags + ", description=" + description + ", mlType=" + mlType + ", status=" + status + ", createdUser=" + createdUser + ", createdTime=" + createdTime + '}';
    }
}
