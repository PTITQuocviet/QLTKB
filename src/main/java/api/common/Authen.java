package api.common;

import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import control.DatabaseHandler;
import control.LDAPHandler;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.HttpURLConnection;
import java.util.Properties;
import javax.naming.NamingException;
import model.User;
import model.web.ErrorInfo;
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
@Path("/auth")
public class Authen implements ApplicationEventListener {

    private final Logger LOGGER = Logger.getLogger(Authen.class);

    private final Gson gson = new Gson();
    private DatabaseHandler dbHandler;

    @Context
    private ServletContext context;

//    /**
//     * Không cần validate token.
//     *
//     * @param request
//     * @param response
//     * @return
//     */
//    @GET
//    @Path("/logout")
//    public Response logout(
//            @Context HttpServletRequest request,
//            @Context HttpServletResponse response
//    ) {
//        String newToken = UtilToken.renewToken(request, -1);
//        setTokenToCookie(response, newToken, -1);
//
//        JsonObject jsonRet = new JsonObject();
//        jsonRet.addProperty("msg", "Logged out");
//        return Response.status(HttpURLConnection.HTTP_OK).entity(gson.toJson(jsonRet)).build();
//    }
    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response login(
            @Context HttpServletResponse response,
            @FormParam("username") String username,
            @FormParam("password") String password
    ) {
        User user = new User();
        user.setUsername(username);
        user = dbHandler.getUser(user);

        if (user == null) {//login fail
            ErrorInfo errorInfo = new ErrorInfo(-1, "Người dùng chưa được thêm vào hệ thống");
            return Response.status(HttpURLConnection.HTTP_UNAUTHORIZED).entity(errorInfo).build();
        }

        //tạo token
        try {
            //thêm thông tin của người dùng vào token
            String token = UtilToken.generateToken(username);
            JsonObject jsonRet = new JsonObject();
            jsonRet.addProperty("token", token);

            return Response.status(HttpURLConnection.HTTP_OK).entity(gson.toJson(jsonRet)).build();
        } catch (Exception ex) {//JWTCreationException
            LOGGER.error("", ex);
            ErrorInfo errorInfo = new ErrorInfo(-500, "Lỗi tạo token");
            return Response.status(HttpURLConnection.HTTP_BAD_REQUEST).entity(errorInfo).build();
        }
    }

    @GET
    @Path("/renew")
    public Response renewToken(
            @Context ContainerRequestContext requestContext,
            @Context HttpServletResponse response
    ) {
        DecodedJWT token = UtilToken.getToken(requestContext);
        try {
            if (UtilToken.isValidToken(token)) {
                String strToken = UtilToken.renewToken(token);
                JsonObject jsonRet = new JsonObject();
                jsonRet.addProperty("token", strToken);
                return Response.status(HttpURLConnection.HTTP_OK).entity(gson.toJson(jsonRet)).build();
            }
            ErrorInfo errorInfo = new ErrorInfo(-501, "Lỗi làm mới token");
            return Response.status(HttpURLConnection.HTTP_BAD_REQUEST).entity(errorInfo).build();
        } catch (Exception ex) {//JWTCreationException
            LOGGER.error("", ex);
            ErrorInfo errorInfo = new ErrorInfo(-500, "Lỗi tạo token");
            return Response.status(HttpURLConnection.HTTP_BAD_REQUEST).entity(errorInfo).build();
        }
    }

//    private void setTokenToCookie(HttpServletResponse response, String token, Integer maxAge) {
//        Cookie cookie = new Cookie(UtilToken.TOKEN_COOKIE_NAME, token);
//        if (maxAge != null) {
//            cookie.setMaxAge(maxAge);
//        }
//        response.addCookie(cookie);
//    }
    private User authenLDAP(String username, String password, LDAPHandler ldapHandler) {
        User user = ldapHandler.authen(username, password);

        if (user != null) {
            return user;
        }

        return null;
    }

//    private LDAPHandler ldapHandler;

    private void initLDAP(Properties prop) throws NamingException {
//        String initContextFactory = prop.getProperty("initial.context.factory");

//        ldapHandler = new LDAPHandler(initContextFactory,
//                prop.getProperty("provider.url"),
//                prop.getProperty("security.authentication"),
//                prop.getProperty("security.principal"),
//                prop.getProperty("security.credentials"),
//                prop.getProperty("dc"));
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
