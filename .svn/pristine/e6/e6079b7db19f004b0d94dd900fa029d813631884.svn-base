package util;

import java.util.Properties;
import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;

/**
 * https://medium.com/@senthalan/check-connection-with-the-ldap-server-60125b96615f
 *
 */
public class LDAPConnector {

    /**
     * Create LDAP connection.
     *
     * @param initContextFactory
     * @param providerURL
     * @param authenType
     * @param principal
     * @param credentials
     * @return new instance of DirContext.
     * @throws javax.naming.NamingException
     */
    public static DirContext createDirContext(String initContextFactory, String providerURL, String authenType, String principal, String credentials) throws NamingException {
        Properties env = new Properties();
        env.put(Context.INITIAL_CONTEXT_FACTORY, initContextFactory);
        env.put(Context.PROVIDER_URL, providerURL);
        env.put(Context.SECURITY_AUTHENTICATION, authenType);
        env.put(Context.SECURITY_PRINCIPAL, principal);
        env.put(Context.SECURITY_CREDENTIALS, credentials);

//        return new InitialDirContext(env);//
        return new InitialDirContext(env);
    }
}
