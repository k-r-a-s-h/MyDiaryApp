const DiaryNote = require('../models/diaryNote')
const user = require('../models/user')
const getPost = async (req,res,next)=>{
    try{
        let diaryNote = await DiaryNote.findById({_id:req.params.id})
        if(!diaryNote){
            let error = new Error('Cannot locate the diary note')
            error.status = 404
            throw error
        }
        let canAccess = await diaryNote.canAccessNote(req.user)
        if(canAccess){
            res.json(diaryNote)
        }
        else{
            res.status(403).json({status : 'Not authorized'}) 
        }
    }
    catch(err){
        next(err)
    }    
}

const newPost = async (req,res,next)=>{
    //Create diary object
    let diary = new DiaryNote({
        content : req.body.content,
        createdBy : req.user
    })
    try{
        await diary.save()
        res.json({status:'inserted successfully'})
    }
    catch(err){
        next(err)
    }
}

const getAllPost = async (req,res,next)=>{
    try{
        let posts = await DiaryNote.find({
            createdBy : req.user
        }).sort({createdAt:-1})
        res.json(posts);
    }
    catch(err){
        next(err)
    }   
}

const deletePost = async (req,res,next)=>{
    try{
        let id = req.params.id
        let userId = req.user
        let note = await DiaryNote.findById({_id:id})
        if(!note){
            let error = new Error('Cannot locate the diary note')
            error.status = 404
            throw error
        }
        let canDelete = await note.canAccessNote(userId)
        if(canDelete){
            await DiaryNote.findByIdAndDelete({_id:id})
            res.json({status:'deleted successfully'})
        }
        else{
            res.status(401).json({status : 'Not authorized'})
        }
    }
    catch(err){
        next(err)
    }
}

const editPost = async (req,res,next)=>{
    try{
        console.log(req.user)
        let userId = req.user
        let content = req.body.content
        let diaryNote = await DiaryNote.findById({_id:req.params.id})
        if(!diaryNote){
            //invalid id
            let error = new Error('Cannot locate the diary note')
            error.status = 404
            throw error 
        }
        let canAccessNote = await diaryNote.canAccessNote(userId)
        if(canAccessNote){
            await DiaryNote.findByIdAndUpdate(req.params.id,{content:content})
            res.json({status:'updated successfully'})
        }
        else{
            res.status(401).json({status : 'Not authorized'})
        }
    }
    catch(err){
        next(err)
    }
}

module.exports ={
    getPost,
    getAllPost,
    newPost,
    deletePost,
    editPost
}