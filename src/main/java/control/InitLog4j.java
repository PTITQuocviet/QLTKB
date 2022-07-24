package control;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import java.io.File;
import org.apache.log4j.PropertyConfigurator;


@WebListener("application-context-listener")
public class InitLog4j implements ServletContextListener {

    /**
     * Initialize log4j when the application is being started.
     *
     * @param event
     */
    @Override
    public void contextInitialized(ServletContextEvent event) {
        System.out.println("Init log4j");
        System.out.println("Working Directory = " + System.getProperty("user.dir"));
        ServletContext context = event.getServletContext();
        String log4jConfigFile = context.getInitParameter("log4j-config-location");
        String fullPath = context.getRealPath("") + File.separator + log4jConfigFile;
        System.out.println(fullPath);
        PropertyConfigurator.configure(fullPath);

    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        System.out.println("contextDestroyed");
    }
}
