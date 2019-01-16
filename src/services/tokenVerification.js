const JWTVerifier = require('@okta/jwt-verifier');
const OAUTH_URL = "https://verify.fortellis.io/oauth2";
let verifier = new JWTVerifier({issuer: OAUTH_URL});

export async function verify(req) {
    if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        return(403);
    }
    try {
        await verifier.verifyAccessToken(req.headers.authorization.split(' ')[1])
    } catch (err) {
        return(401);
    }

}