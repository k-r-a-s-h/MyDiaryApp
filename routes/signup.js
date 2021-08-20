const express = require('express')
const router = express.Router();
const userScehma = require('../models/user');

router.post('/',async(req,res)=>{
    try{
        console.log(req.body)
        let user  = new userScehma({
            ...req.body
        })
        await user.save()
        res.send({status:'user created successfully'})
    }
    catch(error){
        console.log(error);
    } 
})

module.exports = router;