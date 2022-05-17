const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    //writer
    userFrom:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //_id
    productId: {
        type : String
    },
    //title
    productTitle: {
        type: String
    },
    //images
    productPost: {
        type: Array
    },
    //artist
    productArtist: {
        type:String
    },
},{timestamps : true})

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = {Favorite}