function requireAuth(req, res, next){

    if(req.isAuthenticated()){
        return next()
    } 
    if(!req.session.user){
        return res.status(401).json({message:"unauthorized"})
    }
}

module.exports = requireAuth