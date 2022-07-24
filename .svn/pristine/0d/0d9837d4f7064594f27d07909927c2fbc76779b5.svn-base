package util;

import jakarta.ws.rs.core.Response;
import java.net.HttpURLConnection;
import model.web.ErrorInfo;

/**
 * @author toanlh-10
 */
public class ResponseUtil {

    /**
     * Return 200 nếu {@code obj} không null. return 204 nếu {@code obj} null.
     */
    public static Response responseOk(Object obj) {
        if (obj != null) {
            return Response.status(HttpURLConnection.HTTP_OK).entity(obj).build();
        }
        return Response.status(HttpURLConnection.HTTP_NO_CONTENT).entity(null).build();
    }

    public static Response responseError(ErrorInfo errorInfo, int httpCode) {
        return Response.status(httpCode).entity(errorInfo).build();
    }
}
