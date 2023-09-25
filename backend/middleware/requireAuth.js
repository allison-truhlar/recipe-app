function requireAuth(req, res, next){
    console.log(req.isAuthenticated)

    if(req.isAuthenticated()){
        return next()
    } 
    if(!req.isAuthenticated()){
        return res.status(401).json({message:"unauthorized"})
    }
}

module.exports = requireAuth