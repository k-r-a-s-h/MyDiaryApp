const auth = (req,res,next)=>{
    if(req.session.userid){
        next()
    }
    else{
        let error = new Error('Not authorised')
        error.status  = 401
        return next(error)
    }
}

module.exports.isAuthorized = auth