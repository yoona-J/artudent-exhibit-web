const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //form - 이름
    title: {
        type: String,
        maxlength: 50
    },
    //form - 내용
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    //몇개나 팔렸는지에 대한 정보
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    //토글 버튼
    continents: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, { timeStamps: true });

//어떤 부분에서 키워드를 검색할 건지
productSchema.index (
    {
        title: "text",
        description: "text"
    },
    {
        //숫자가 클 수록 더 중요하게 생각한다 (-배)
        weights: {
            title: 5,
            description: 1
        }
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }