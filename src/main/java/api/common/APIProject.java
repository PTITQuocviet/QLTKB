package api.common;

import com.auth0.jwt.interfaces.DecodedJWT;
import control.DatabaseHandler;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.HttpURLConnection;
import java.util.List;
import model.Project;
import model.web.ErrorInfo;
import model.web.ResultPagging;
import model.web.SearchParamProject;
import org.apache.log4j.Logger;
import org.glassfish.jersey.server.monitoring.ApplicationEvent;
import org.glassfish.jersey.server.monitoring.ApplicationEventListener;
import org.glassfish.jersey.server.monitoring.RequestEvent;
import org.glassfish.jersey.server.monitoring.RequestEventListener;
import util.ResponseUtil;
import util.UtilToken;

/**
 * @author toanlh-10
 */
@Path("/projects")
public class APIProject implements ApplicationEventListener {

    private final Logger LOGGER = Logger.getLogger(APIProject.class);

    private DatabaseHandler dbHandler;

    /**
     * Tìm kiếm project.
     *
     * @param searchProjectParam thông tin tìm kiếm project
     * @return
     */
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response searchProjects(
            @Context ContainerRequestContext requestContext,
            @BeanParam SearchParamProject searchParamProject
    ) {
        DecodedJWT token = UtilToken.getToken(requestContext);
        LOGGER.info("User " + token.getSubject());

        ResultPagging<Project> resultPagging = dbHandler.searchProjects(searchParamProject);

        return ResponseUtil.responseOk(resultPagging);
    }

    /**
     * Lấy thông tin của 1 project.
     *
     * @param requestContext để lấy thông tin token.
     * @param id
     * @return 
     */
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response getProject(
            @Context ContainerRequestContext requestContext,
            @PathParam("id") String id
    ) {
        DecodedJWT token = UtilToken.getToken(requestContext);
        LOGGER.info("User " + token.getSubject());
//        
        //TODO đọc thông tin user trong token
        //TODO validate tham số. return 422 nếu tham số không hợp lệ
        SearchParamProject searchParamProject = new SearchParamProject(id);

        //TODO mọi method tác động đến db phải thêm tham số actor là user thực hiện để thủ tục ở db xác định quyền truy vấn
        Project project = dbHandler.getProject(new Project(searchParamProject.getId()));
        
        return ResponseUtil.responseOk(project);
    }

    /**
     * Tạo 1 project mới.
     *
     * @param newProject
     * @return Thông tin chi tiết của project mới tạo thành công.
     */
    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response createProject(
            @Context ContainerRequestContext requestContext,
            Project newProject
    ) {
        DecodedJWT token = UtilToken.getToken(requestContext);
        LOGGER.info("User " + token.getSubject());
        LOGGER.info(newProject);
        //tạo project
        Project project = dbHandler.createProject(newProject);

        if (project == null) {//tạo lỗi
            ErrorInfo errorInfo = new ErrorInfo(-1000, "Không tạo được project");
            return ResponseUtil.responseError(errorInfo, HttpURLConnection.HTTP_BAD_REQUEST);
        }

        return ResponseUtil.responseOk(project);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response updateProject(
            @Context ContainerRequestContext requestContext,
            @PathParam("id") String id,
            Project newProject
    ) {
        DecodedJWT token = UtilToken.getToken(requestContext);
        newProject.setId(id);
        //sửa project
        Project project = dbHandler.updateProject(newProject);

        if (project == null) {//tạo lỗi
            ErrorInfo errorInfo = new ErrorInfo(1, "Không sửa được project");
            return ResponseUtil.responseError(errorInfo, HttpURLConnection.HTTP_BAD_REQUEST);
        }

        return ResponseUtil.responseOk(project);
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response deleteProject(
            @Context ContainerRequestContext requestContext,
            @BeanParam Project newProject
    ) {
        if (newProject.getId() == null || newProject.getId().isEmpty()) {
            ErrorInfo errorInfo = new ErrorInfo(0, "Thông tin ID không hợp lệ");
            return ResponseUtil.responseError(errorInfo, HttpURLConnection.HTTP_BAD_REQUEST);
        }
        
        DecodedJWT token = UtilToken.getToken(requestContext);
        
        Project project = dbHandler.deleteProject(newProject);

        if (project == null) {//lỗi
            ErrorInfo errorInfo = new ErrorInfo(1, "Không xóa được project");
            return ResponseUtil.responseError(errorInfo, HttpURLConnection.HTTP_BAD_REQUEST);
        }

        return ResponseUtil.responseOk(project);
    }

    @Override
    public void onEvent(ApplicationEvent ae) {
        ApplicationEvent.Type type = ae.getType();

        if (type == ApplicationEvent.Type.INITIALIZATION_START) {
//            File fileLDAPConfig = new File(context.getRealPath(""), "WEB-INF/ldap.properties");

//            try (InputStream input = new FileInputStream(fileLDAPConfig)) {
//                Properties prop = new Properties();
//                prop.load(input);
//                initLDAP(prop);
//            } catch (IOException ex) {
//                LOGGER.fatal("Can't read file config", ex);
//            } catch (Exception ex) {
//                LOGGER.fatal("#177. Can't init LDAP connection", ex);
//            }
            dbHandler = new DatabaseHandler();
        }
    }

    /**
     * https://www.cwiki.us/display/JERSEYEN/Monitoring+Jersey+Applications
     */
    @Override
    public RequestEventListener onRequest(RequestEvent re) {
        return null;
    }
}
