const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);//Unauthorized
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);//roles array
        console.log(req.roles);//roles that were sent with the request
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);//the map side checks if the role in the request[req.roles] is included/present in the rolesArray and return a boolean value[true/false]. while the find side looks for the first true value 
        if(!result) res.sendStatus(401)//Unauthorized
        next();
    }
}

module.exports = verifyRoles;