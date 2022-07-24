package api;

import api.filter.AuthenticationFilter;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

//@ApplicationPath("/*")
public class ResourceApplication extends ResourceConfig {

    public ResourceApplication() {
        packages("api.filter");
        register(AuthenticationFilter.class);
        register(JacksonFeature.class);
//        property(ServerProperties.OUTBOUND_CONTENT_LENGTH_BUFFER, 0);
    }

}
