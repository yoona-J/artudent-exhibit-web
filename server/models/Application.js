const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Application 모델 생성하기 
const applicationSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    name: {
        type: String,
        maxlength: 50
    },
    call: {
        type: Number,
        maxlength: 50
    },
    mail: {
        type: String,
        maxlength: 50
    },
    nickname: {
        type: String,
        maxlength: 50
    },
    design: {
        type: Number,
    },
    piece: {
        type: Number,
        maxlength: 50
    },
    member: {
        type: Number,
        maxlength: 50
    },
    continent: {
        type: String,
    },
    policy: {
        type: Boolean,
    },
    type: {
        type: Boolean,
    },
    marketing: {
        type: Boolean,
    },


}, { timestamps: true })


const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application }