const User = require('../model/User');

const handleLogout = async (req, res) => {
    //on client side , also delete the access token

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);//No content
    const refreshToken = cookies.jwt;

    //Is refresh token in database?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if(!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });//in production , it's good to add the option secure: true- it is good for https routes
        return res.sendStatus(403);
    }
   
    //delete refresh token in database
   foundUser.refreshToken = '';
   const result = await foundUser.save();
   console.log(result);
   
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}
   
   
module.exports = { handleLogout }