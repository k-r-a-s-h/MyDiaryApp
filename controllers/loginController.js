const userSchema = require('../models/user');

const login = async(req,res,next)=>{
    try{
        let user = await userSchema.findOne({email:req.body.email})
        if(!user){
            res.status(401).json({status:'invalid emailid or password'})
        }
        else{
            let isMatch = await user.validatePassword(req.body.password)
            if(isMatch) {
                let session = req.session
                session.userid = user._id
                res.status(200).json({status:'logged in successfully'})
            }
            else {
                res.status(401).json({status:'invalid emailid or password'})
            }
        }    
    }
    catch(err){
        let error = new Error('Internal Server Error')
        next(error)
    }
}

module.exports = {
    login
}