package model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author toanlh-10
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MachineLearningType {

    public static final String MACHINE_LEARNING_TYPE_CLASSIFICATION = "classification";
    public static final String MACHINE_LEARNING_TYPE_REGRESSION = "regression";
    public static final String MACHINE_LEARNING_TYPE_CLUSTERING = "clustering";

    @JsonIgnore//không cần hiển thị ở web và không cần nhập vào từ web
    private Integer id;
    private String type;
    private String name;

    public MachineLearningType(String type) {
        this.type = type;
    }

    public MachineLearningType() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "MachineLearningType{" + "id=" + id + ", type=" + type + ", name=" + name + '}';
    }
}
