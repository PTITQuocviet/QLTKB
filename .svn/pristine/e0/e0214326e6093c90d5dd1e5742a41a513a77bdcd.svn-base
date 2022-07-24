package model.web;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

/**
 * Thông tin về lỗi.
 * @author toanlh-10
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorInfo {

    /**Mã lỗi, luôn phải có giá trị khác 0 và unique*/
    private int code;
    private String message;
    private String description;
    private List<ErrorInfo> errors;

    public ErrorInfo(int code, String message, String description) {
        this.code = code;
        this.message = message;
        this.description = description;
    }

    public ErrorInfo(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorInfo(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ErrorInfo> getErrors() {
        return errors;
    }

    public void setErrors(List<ErrorInfo> errors) {
        this.errors = errors;
    }

    @Override
    public String toString() {
        return "ErrorInfo{" + "code=" + code + ", message=" + message + ", description=" + description + ", errors=" + errors + '}';
    }
    
}
