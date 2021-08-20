const mongooose = require('mongoose')
const { Schema } = mongooose;

const diaryNote = new Schema({
    content : {type:String},
    createdBy : {
        type : mongooose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }

},{timestamps:true})

diaryNote.methods.canAccessNote = async function (userid){
    return userid == this.createdBy
}


const DiaryNote = mongooose.model('DiaryNote',diaryNote)
module.exports = DiaryNote