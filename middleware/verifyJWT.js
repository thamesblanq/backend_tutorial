const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);//unauthorized
    const token = authHeader.split(' ')[1];// get access token that is sent to the client side
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403);// invalid token
                req.user = decoded.UserInfo.username;//if user is found/authorized, this assigns the request's username to the decoded username 
                req.roles = decoded.UserInfo.roles;
                next();
            
           
        }
    );
}

module.exports = verifyJWT;

