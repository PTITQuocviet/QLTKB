package util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.ws.rs.container.ContainerRequestContext;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

/**
 * @author toanlh-10
 */
public class UtilToken {

    public static final String HEADER_TOKEN_NAME = "Authorization";
    public static final String REQUEST_CONTEXT_PROPERTY_TOKEN = "token";
    
    private static final String JWT_TOKEN_KEY = "toanlh-key";
    public static final int TIME_BETWEEN_RENEW_TOKEN = 1800;
    public static final int MAX_SESSION_TIME_SEC = 86400;

    public static final String TOKEN_CLAIM_ROLES = "roles";
    public static final String TOKEN_CLAIM_SESSION = "session";
    
    
    public static DecodedJWT getToken(ContainerRequestContext requestContext) {
        String strToken = requestContext.getProperty(UtilToken.REQUEST_CONTEXT_PROPERTY_TOKEN).toString();
        DecodedJWT decodedToken = UtilToken.decodeToken(strToken);

        return decodedToken;
    }

    public static DecodedJWT decodeToken(String token) {
        return JWT.decode(token);
    }

    public static Map<String, Claim> getClaims(String token) {
        return UtilToken.decodeToken(token).getClaims();
    }

    public static String[] getClaimRoles(Map<String, Claim> claims) {
        Claim claim = claims.get(TOKEN_CLAIM_ROLES);
        return claim.asArray(String.class);
    }

    public static void getClaim(DecodedJWT decodedToken) {
        Map<String, Claim> claims = decodedToken.getClaims();
        claims.forEach((k, claim) -> {
            String[] ret = claim.asArray(String.class);
        });
    }

    /**
     * Kiểm tra token của request. Nếu đúng claim và còn hạn và session không
     * qua lâu thì valid
     *
     * @param decodedToken
     * @return
     */
    public static boolean isValidToken(DecodedJWT decodedToken) {
        String token = decodedToken.getToken();
        if (token == null || token.isEmpty()) {
            return false;
        }

        DecodedJWT decode = JWT.decode(token);
        String subject = decode.getSubject();
        String sessionId = decode.getClaim(TOKEN_CLAIM_SESSION).asString();

        if (subject == null || subject.isEmpty()) {
            return false;
        }

        Algorithm algorithm = Algorithm.HMAC256(JWT_TOKEN_KEY);
        JWTVerifier verifier = JWT.require(algorithm)
                .withSubject(subject)
                .withClaim(TOKEN_CLAIM_SESSION, sessionId)
                .build();
        DecodedJWT jwt = verifier.verify(decode);
        return true;
    }
    
    public static String renewToken(DecodedJWT oldToken) {
        return renewToken(oldToken, TIME_BETWEEN_RENEW_TOKEN);
    }
    
    /**
     * được gọi đến khi gia hạn thời gian token.Không được để session vượt quá
     * giới hạn.
     *
     * @return
     */
    private static String renewToken(DecodedJWT oldToken, long tokenLiveTimeSec) {//User-Agent
        String sessionId = oldToken.getClaim(TOKEN_CLAIM_SESSION).asString();
        Date issuedAt = oldToken.getIssuedAt();
        String subject = oldToken.getSubject();

        final Algorithm algorithm = Algorithm.HMAC256(JWT_TOKEN_KEY);
        return JWT.create()
                .withIssuedAt(issuedAt)
                .withExpiresAt(Date.from(ZonedDateTime.now().plusSeconds(tokenLiveTimeSec).toInstant()))
                .withSubject(subject)
                .withClaim(TOKEN_CLAIM_SESSION, sessionId)
                .sign(algorithm);
    }

    /**
     * được gọi đến khi gia hạn token.
     *
     * @param username
     * @param tokenBuiler
     * @return
     */
    public static String generateToken(final String username) {//User-Agent
        final Algorithm algorithm = Algorithm.HMAC256(JWT_TOKEN_KEY);
        return JWT.create().withIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .withExpiresAt(Date.from(ZonedDateTime.now().plusSeconds(TIME_BETWEEN_RENEW_TOKEN).toInstant()))
                .withSubject(username)
                .withClaim(TOKEN_CLAIM_SESSION, UUID.randomUUID().toString())//là id của session. Cần đổi lại là tạo ra từ client JS
                .sign(algorithm);
    }
}
