const DiaryNote = require('../models/diaryNote')
const user = require('../models/user')
const getPost = async (req,res,next)=>{
    try{
        let diaryNote = await DiaryNote.findById({_id:req.params.id})
        console.log(diaryNote)
        let canAccess = await diaryNote.canAccessNote(req.session.userid)
        if(canAccess){
            res.json(diaryNote)
        }
        else{
            res.status(401).json({status : 'Not authorized'}) 
        }
    }
    catch(err){
        console.log(err)
        let error = new Error('Internal Server Error')
        next(error)
    }    
}

const newPost = async (req,res,next)=>{
    //Create diary object
    let diary = new DiaryNote({
        content : req.body.content,
        createdBy : req.session.userid
    })
    try{
        await diary.save()
        res.json({status:'inserted successfully'})
    }
    catch(err){
        console.log(err)
        let error = new Error('Internal Server Error')
        next(error)
    }
}

const getAllPost = async (req,res,next)=>{
    try{
        let posts = await DiaryNote.find({
            createdBy : req.session.userid
        })
        res.json(posts);
    }
    catch(err){
        console.log(err)
        let error = new Error('Internal Server Error')
        next(error)
    }   
}

const deletePost = async (req,res,next)=>{
    try{
        let id = req.params.id
        let userId = req.session.userid;
        let note = await DiaryNote.findById({_id:id})
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
        console.log(err)
        let error = new Error('Internal Server Error')
        next(error)
    }
}

module.exports ={
    getPost,
    getAllPost,
    newPost,
    deletePost
}