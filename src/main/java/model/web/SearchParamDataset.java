package model.web;

import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.PathParam;

/**
 * Lưu thông tin để tìm kiếm project.
 *
 * @author toanlh-10
 */
public class SearchParamDataset extends SearchParam{
    @PathParam("prj_id")
    private String prjId;
    @QueryParam("id")
    private String id;
    @QueryParam("name")
    private String name;
    @QueryParam("progress")
    private String progress;
    @QueryParam("time")
    private String time;
    
    public SearchParamDataset(String id) {
        this.id = id;
    }
    
    public SearchParamDataset() {
    }

    public String getPrjId() {
        return prjId;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getProgress() {
        return progress;
    }

    public String getTime() {
        return time;
    }

    public void setPrjId(String prjId) {
        this.prjId = prjId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public void setTime(String time) {
        this.time = time;
    }


    @Override
    public String toString() {
        return "SearchParamDataset{" + "prj_id=" + prjId + ", id=" + id + ", name=" + name + ", progress=" + progress 
                + ", time=" + time + '}';
    }
}
