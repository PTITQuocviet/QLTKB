package model;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

/**
 * @author AN LE
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Dataset {

    private String prjId;
    private String id;
    private String name;
    private List<String> tags;
    private String progress;
    private String time;
    
    public Dataset(String prjId, String stt, String id, String name, List<String> tags, String progress, String time, DatasetInfo info){
        this.prjId = prjId;
        this.id = id;
        this.name = name;
        this.tags = tags;
        this.progress = progress;
        this.time = time;
    }
    
    public Dataset(){
        
    }
    
    public Dataset(String id){
        this.id = id;
    }
    
    public Dataset(String prjId, String id){
        this.prjId = prjId;
        this.id = id;
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

    public List<String> getTags() {
        return tags;
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

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public void setTime(String time) {
        this.time = time;
    }
    
    @Override
    public String toString() {
        return "Dataset{" + "prj_id=" + prjId + ", id=" + id + ", name=" + name + ", tags=" + tags +  ", progress=" + progress + '}';
    }
}
