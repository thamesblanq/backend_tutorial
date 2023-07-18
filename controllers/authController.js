const User = require('../model/User');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "Username and password are required"});
    const foundUser = await User.findOne({ username: user }).exec();
    if(!foundUser) return res.sendStatus(401);//Unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match){
        const roles = Object.values(foundUser.roles);
        //create JWTs
        const accessToken = jwt.sign(
        {   
            "UserInfo": {
                "username": foundUser.username,
                "roles": roles
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        //saving refresh token with current user
       foundUser.refreshToken = refreshToken;
       const result = await foundUser.save();
       console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });// send the refresh token to the client side via cookies so that if the access token expires the refresh token can create a new one

        res.json({ accessToken });// send the access token to the client side to be used
    }else {
        res.sendStatus(401);//unauthorized
    }
} 
module.exports = { handleLogin };