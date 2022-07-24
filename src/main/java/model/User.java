package model;

import com.google.gson.annotations.SerializedName;//https://howtodoinjava.com/gson/gson-serializedname/
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class User {

    public static final int USER_STATUS_INACTIVE = 0;
    public static final int USER_STATUS_ACTIVE = 1;

    @SerializedName(value = "idUser")
    private int id;
    private String username;//dùng để hiển thị, có cả @
    private String fullname;//dùng để hiển thị
    private int status;//dùng để hiển thị
    private String note;

    private static final Pattern patternMail = Pattern.compile("(?<name>[^@]+)@.*");

    public User() {
        status = -1;
    }

    public User(String username, String fullname, int status, String note) {
        this.username = username;
        this.fullname = fullname;
        this.status = status;
        this.note = note;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return username để login không bao gồm @
     */
    public String getUsernameLogin() {
        if (username == null || username.isEmpty()) {
            return username;
        }
        
        Matcher matcher = patternMail.matcher(username);

        if (matcher.find()) {
            //nếu có @ thì loại bỏ
            return matcher.group("name");
        }
        
        return username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
