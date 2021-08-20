const logout = async (req,res,next)=>{
    req.session.destroy()
    res.json({status:'logged out successfully'})
}
module.exports = {
    logout
}