package api.filter;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import model.web.ErrorInfo;
import org.apache.log4j.Logger;
import org.glassfish.jersey.server.monitoring.ApplicationEvent;
import org.glassfish.jersey.server.monitoring.ApplicationEventListener;
import org.glassfish.jersey.server.monitoring.RequestEvent;
import org.glassfish.jersey.server.monitoring.RequestEventListener;
import util.UtilToken;

public class AuthenticationFilter implements ContainerRequestFilter, ApplicationEventListener {

    private final Logger LOGGER = Logger.getLogger(AuthenticationFilter.class);

    @Override
    public void filter(ContainerRequestContext requestContext) {
//        logger.info("Filter API");

        //api đăng nhập không cần xử lý token
        String token;
        if (requestContext.getUriInfo().getPath().compareTo("auth/login") != 0) {
            String authorization = requestContext.getHeaderString(UtilToken.HEADER_TOKEN_NAME);

            if (authorization == null) {
//thiếu thông tin token nên không được truy cập
                ErrorInfo errorInfo = new ErrorInfo(-2, "Token không hợp lệ", "Thiếu token");
                requestContext.abortWith(
                        Response.status(Response.Status.UNAUTHORIZED).entity(errorInfo).build());
            }

            if (!authorization.startsWith("Bearer ")) {
//                ErrorInfo errorInfo = new ErrorInfo(-2, "Token không hợp lệ", "Token phải có 'Bearer '");
//                requestContext.abortWith(
//                        Response.status(Response.Status.UNAUTHORIZED).entity(errorInfo).build());
                token = authorization;
            } else {
                token = authorization.substring(7, authorization.length());
            }
            requestContext.setProperty(UtilToken.REQUEST_CONTEXT_PROPERTY_TOKEN, token);
        }
    }

    @Override
    public void onEvent(ApplicationEvent ae) {
        ApplicationEvent.Type type = ae.getType();

        if (type == ApplicationEvent.Type.INITIALIZATION_START) {
            LOGGER.info("INITIALIZATION_START");
        }
    }

    /**
     * https://www.cwiki.us/display/JERSEYEN/Monitoring+Jersey+Applications
     *
     * @param event
     * @return
     */
    @Override
    public RequestEventListener onRequest(RequestEvent event) {
        return null;
    }

}
