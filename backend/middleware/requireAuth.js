function requireAuth(req, res, next){


    if(req.isAuthenticated()){
        return next()
    } 
    if(!req.isAuthenticated()){
        return res.status(401).json({message:"unauthorized"})
    }
}

module.exports = requireAuth