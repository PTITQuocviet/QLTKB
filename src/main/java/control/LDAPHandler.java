package control;

import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import model.User;
import org.apache.log4j.Logger;
import util.LDAPConnector;

/**
 * Xử lý các truy vấn đến LDAP. Khi nhận truy vấn, nếu thấy mất kết nối thì sẽ
 * tạo lại kết nối.
 */
public class LDAPHandler {

    private final Logger logger = Logger.getLogger(LDAPHandler.class);

    private final String initContextFactory;
    private final String providerURL;
    private final String authenType;
    private final String principal;
    private final String credentials;
//    private final DirContext dirContext;
    private final String ldapDC;

    public LDAPHandler(String initContextFactory, String providerURL, String authenType, String principal, String credentials, String ldapDC) throws NamingException {
        this.initContextFactory = initContextFactory;
        this.providerURL = providerURL;
        this.authenType = authenType;
        this.principal = principal;
        this.credentials = credentials;
        this.ldapDC = ldapDC;
    }

    /**
     * Lấy kết nối LDAP.
     *
     * @return null nếu có lỗi tạo kết nối.
     */
    private DirContext getDirContext() {
        DirContext ret = null;

        try {
            ret = LDAPConnector.createDirContext(initContextFactory, providerURL, authenType, principal, credentials);
        } catch (NamingException ex) {
            logger.error("getDirContext", ex);
        }

        return ret;
    }

    /**
     * Đóng kết nối LDAP.
     *
     * @param dirContext
     */
    private void closeConnection(DirContext dirContext) {
        if (dirContext != null) {
            try {
                dirContext.close();
            } catch (NamingException ex) {
                logger.error("Close LDAP connection", ex);
            }
        }
    }

    private final Pattern patternMail = Pattern.compile("@");

    //https://docs.oracle.com/javase/jndi/tutorial/ldap/security/ldap.html
    /**
     * Xác thực user tồn tại trong LDAP. Nếu người dùng nhập cả @ thì mình không
     * nối thêm đuôi. Nếu người dùng không có @ thì mình xác thực theo 2 kiểu
     * cho mỗi miền.
     *
     * @param username
     * @param password
     * @return true nếu user đăng nhập LDAP thành công, false nếu đăng nhập LDAP
     * thất bại.
     */
    public User authen(String username, String password) {
        Matcher matcher = patternMail.matcher(username);
        boolean authenOK;
        String usernameSearch;
        boolean hasAt = matcher.find();

        //tìm user trước khi xác thực
        if (hasAt) {
            usernameSearch = username;
        } else {
            usernameSearch = username + "@*";
        }

        User user;
        user = searchOneUserUPN(usernameSearch);

        if (user != null) {
            //tìm thấy thì xác thực
            authenOK = authenUPN(user.getUsername(), password);
            if (authenOK) {
                return user;
            }
        }

        return null;
    }

    private boolean authenUPN(String username, String password) {
        try {
            DirContext dirContext = LDAPConnector.createDirContext(initContextFactory, providerURL, authenType, username, password);
            try {
                dirContext.close();
            } catch (NamingException ex) {
                logger.error(ex.getMessage());
            }
            return true;
        } catch (NamingException ex) {
            logger.error(ex.getMessage());
        }

        return false;
    }

    /**
     * Tìm 1 user theo UPN.
     *
     * @param username Tìm tên chính xác hoặc LIKE.
     * @return
     */
    public User searchOneUserUPN(String username) {
        User user = null;

        List<User> users = searchUser(username, 1, 5000);
        if (users != null && !users.isEmpty()) {
            user = users.get(0);
        }

        return user;
    }

    private void testSearchUser(String initContextFactory, String providerURL, String authenType, String principal, String credentials, String username) {
        System.out.println("Start test search");
        try {
            DirContext dirContext = LDAPConnector.createDirContext(initContextFactory, providerURL, authenType, principal, credentials);
            System.out.println("system principal: " + principal);

            if (dirContext != null) {//đăng nhập user hệ thống thành công
                username = "*";//debug
                String searchFilter = String.format("(&(objectClass=user)(userPrincipalName=%s))", username);
                String[] attrs = {"userPrincipalName"};//danh sách field cần lấy từ attributes
                try {
                    SearchControls searchControls = new SearchControls(SearchControls.SUBTREE_SCOPE, 0, 10000, attrs, false, false);
                    NamingEnumeration<SearchResult> results = dirContext.search(this.ldapDC, searchFilter, searchControls);

                    while (results.hasMoreElements()) {
                        SearchResult searchResult = (SearchResult) results.nextElement();
                        Attributes attributes = searchResult.getAttributes();
                        String strUsername = attributes.get("userPrincipalName").get().toString();
                        System.out.println("found user: " + strUsername);//debug
                    }
                } catch (NamingException ex) {
                    logger.error("searchUser", ex);
                } finally {
                    closeConnection(dirContext);
                }
            } else {
                logger.fatal("Đăng nhập user hệ thống thất bại");
            }
        } catch (NamingException ex) {
            logger.error("getDirContext", ex);
        }
        System.out.println("End test search");
    }

    /**
     * @param username Có thể nhập tìm kiếm chính xác hoặc like. Cần validate
     * (không cho ký tự đặc biệt) trước khi dùng.
     * (https://confluence.atlassian.com/kb/how-to-write-ldap-search-filters-792496933.html).
     * @param row số lượng kết quả trả về, 0 là trả về không giới hạn
     * @param timeLimitMS thời gian tìm kiếm tối đa ms.
     * @return null if error when searching. Empty list if no result.
     */
    public List<User> searchUser(String username, int row, int timeLimitMS) {
        //http://www.coderpanda.com/list-users-ldap-using-jndi/
//        testSearchUser("com.sun.jndi.ldap.LdapCtxFactory", "ldap://10.15.10.135:389", "simple", "CN=fdp2,OU=fdp,DC=fis,DC=local", "123456a@", "*");
        DirContext dirContext = getDirContext();

        if (dirContext == null) {//đăng nhập user hệ thống không thành công
            logger.fatal("Đăng nhập user hệ thống thất bại");
            return null;
        }

        LinkedList<User> users = new LinkedList<>();
        String searchFilter = String.format("(&(objectClass=user)(userPrincipalName=%s))", username);
        String[] attrs = {"displayname", "userPrincipalName"};//danh sách field cần lấy từ attributes
        try {
            SearchControls searchControls = new SearchControls(SearchControls.SUBTREE_SCOPE, row, timeLimitMS, attrs, false, false);
            NamingEnumeration<SearchResult> results = dirContext.search(this.ldapDC, searchFilter, searchControls);

            while (results.hasMoreElements()) {
                SearchResult searchResult = (SearchResult) results.nextElement();
                Attributes attributes = searchResult.getAttributes();
                User user = new User();
                String strUsername = attributes.get("userPrincipalName").get().toString();
                user.setUsername(strUsername);
                Attribute attributeDisplayname = attributes.get("displayname");
                String fullName = strUsername;
                
                if (attributeDisplayname != null) {
                    fullName = attributeDisplayname.get().toString();
                }
                
                user.setFullname(fullName);
                users.add(user);
            }
        } catch (NamingException ex) {
            logger.error("searchUser", ex);
        } finally {
            closeConnection(dirContext);
        }

        return users;
    }
}
