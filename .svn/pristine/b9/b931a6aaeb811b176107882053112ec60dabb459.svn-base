package control;

import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import org.apache.log4j.Logger;

/**
 * @author toanlh-10
 */
public class ConnectionPool {

    private final Logger logger = Logger.getLogger(ConnectionPool.class);
    private DataSource dataSource;

    public ConnectionPool() {
        try {
            dataSource = (javax.sql.DataSource) new InitialContext().lookup("java:comp/env/jdbc/MySQL");
        } catch (NamingException e) {
            // Handle error that it's not configured in JNDI.
            throw new IllegalStateException("jdbc/MySQL is missing in JNDI!", e);
        }
    }

    public Connection getConnection() {
        try {
            Connection connection = dataSource.getConnection();
            if (connection == null) {
                logger.error("Get connection: null");
                return null;
            }
//            System.out.println("Get connection: OK");
            return connection;
        } catch (SQLException ex) {
            ex.printStackTrace();
            logger.error("getConnection", ex);
        }
        System.out.println("Get connection: FAIL");

        return null;
    }
}
