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
import model.Dataset;
import model.web.ErrorInfo;
import model.web.ResultPagging;
import model.web.SearchParamDataset;
import org.apache.log4j.Logger;
import org.glassfish.jersey.server.monitoring.ApplicationEvent;
import org.glassfish.jersey.server.monitoring.ApplicationEventListener;
import org.glassfish.jersey.server.monitoring.RequestEvent;
import org.glassfish.jersey.server.monitoring.RequestEventListener;
import util.ResponseUtil;
import util.UtilToken;

/**
 * @author AN LE
 */
@Path("/projects/{prj_id}/datasets")
public class APIDataset implements ApplicationEventListener {

    private final Logger LOGGER = Logger.getLogger(APIDataset.class);

    private DatabaseHandler dbHandler;

    /**
     * Tìm kiếm dataset.
     *
     * @param requestContext
     * @param searchParamDataset 
     * @return
     */
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response searchDatasets(
            @Context ContainerRequestContext requestContext,
            @BeanParam SearchParamDataset searchParamDataset
    ) {
        DecodedJWT token = UtilToken.getToken(requestContext);
        LOGGER.info("User " + token.getSubject());
        LOGGER.info(searchParamDataset.toString());

        ResultPagging<Dataset> resultPagging = dbHandler.searchDatasets(searchParamDataset);
        
        return ResponseUtil.responseOk(resultPagging);
    }

    /**
     * Lấy thông tin của 1 dataset.
     *
     * @param requestContext
     * @param prjId
     * @param id
     * @return 
     */
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response getDataset(
            @Context ContainerRequestContext requestContext,
            @PathParam("prj_id") String prjId,
            @PathParam("id") String id
    ) {
        DecodedJWT token = UtilToken.getToken(requestContext);
        LOGGER.info("User " + token.getSubject());
        LOGGER.info("prj_id: " + prjId);
        LOGGER.info("id: " + id);
//        
        //TODO đọc thông tin user trong token
        //TODO validate tham số. return 422 nếu tham số không hợp lệ
        SearchParamDataset searchParamDataset = new SearchParamDataset(id);

        //TODO mọi method tác động đến db phải thêm tham số actor là user thực hiện để thủ tục ở db xác định quyền truy vấn
        Dataset dataset = dbHandler.getDataset(new Dataset(searchParamDataset.getId()));

        return ResponseUtil.responseOk(dataset);
    }

    /**
     * Tạo 1 dataset mới.
     *
     * @param requestContext
     * @param prjId
     * @param newDataset
     * @return Thông tin chi tiết của dataset mới tạo thành công.
     */
    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response createDataset(
            @Context ContainerRequestContext requestContext,
            @PathParam ("prj_id") String prjId,
            Dataset newDataset
    ) {
        DecodedJWT token = UtilToken.getToken(requestContext);
        LOGGER.info("User " + token.getSubject());
        LOGGER.info(prjId);
        newDataset.setPrjId(prjId);
        LOGGER.info(newDataset);
        //tạo dataset
        Dataset dataset = dbHandler.createDataset(newDataset);

        if (dataset == null) {//tạo lỗi
            ErrorInfo errorInfo = new ErrorInfo(-1000, "Không tạo được dataset");
            return ResponseUtil.responseError(errorInfo, HttpURLConnection.HTTP_BAD_REQUEST);
        }

        return ResponseUtil.responseOk(dataset);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response updateDataset(
            @Context ContainerRequestContext requestContext,
            @PathParam ("prj_id") String prjId,
            @PathParam("id") String id,
            Dataset newDataset
    ) {
        DecodedJWT token = UtilToken.getToken(requestContext);
        newDataset.setPrjId(prjId);
        newDataset.setId(id);
        LOGGER.info("User " + token.getSubject());
        LOGGER.info(newDataset);

        //sửa dataset
        Dataset dataset = dbHandler.updateDataset(newDataset);

        if (dataset == null) {//tạo lỗi
            ErrorInfo errorInfo = new ErrorInfo(1, "Không sửa được dataset");
            return ResponseUtil.responseError(errorInfo, HttpURLConnection.HTTP_BAD_REQUEST);
        }

        return ResponseUtil.responseOk(dataset);
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response deleteDataset(
            @Context ContainerRequestContext requestContext,
            @PathParam ("prj_id") String prjId,
            @PathParam("id") String id
            //@BeanParam Dataset newDataset
    ) {
        if (prjId == null || prjId.isEmpty() || id == null || id.isEmpty()) {
            ErrorInfo errorInfo = new ErrorInfo(0, "Thông tin ID hoặc project không hợp lệ");
            return ResponseUtil.responseError(errorInfo, HttpURLConnection.HTTP_BAD_REQUEST);
        }
        
        DecodedJWT token = UtilToken.getToken(requestContext);
        LOGGER.info("User " + token.getSubject());
        
        Dataset deleteDataset = new Dataset(prjId, id);
        LOGGER.info(deleteDataset);
        Dataset dataset = dbHandler.deleteDataset(deleteDataset);

        if (dataset == null) {//lỗi
            ErrorInfo errorInfo = new ErrorInfo(1, "Không xóa được project");
            return ResponseUtil.responseError(errorInfo, HttpURLConnection.HTTP_BAD_REQUEST);
        }

        return ResponseUtil.responseOk(dataset);
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
