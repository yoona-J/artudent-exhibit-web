const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');
const { User } = require('../models/User')

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    //어디에 파일이 저장이 되는지 - uploads 파일 안 이미지
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
    //가져온 이미지를 저장한다.
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})

//uploadProductPage.js의 api가 index.js의 api와 같기 때문에 '/'
router.post('/', (req, res) => {

  //받아온 정보들을 DB에 넣어준다
  // console.log(req.body)
  const product = new Product(req.body)
  product.save((err) => {
    console.log('err', err)
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })

})


router.post('/products', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  // console.log(term)
  //filters
  let findArgs = {};

  //filters의 key(continents)값을 가져온다
  for(let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  console.log('findArgs', findArgs)
  console.log(term)


  if (term) {
    //product collection에 들어있는 모든 정보 가져오기
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")  //DB에 저장된 writer ID 정보로 작성자에 대한 정보들을 모두 가져온다
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        console.log(productInfo)
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ 
          success: true, productInfo, 
          postSize: productInfo.length })
      })
  } else {
    //product collection에 들어있는 모든 정보 가져오기
    Product.find(findArgs)
      .populate("writer")  //DB에 저장된 writer ID 정보로 작성자에 대한 정보들을 모두 가져온다
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ 
          success: true, productInfo, 
          postSize: productInfo.length })
      }) 
      // console.log('productInfo=', productInfo)
  }

  // console.log('term', req.body.searchTerm)

})

router.get('/products_by_id', (req, res) => {

  let type = req.query.type
  let productIds = req.query.id

  if(type === "array") {
    //[] 배열 형식으로 바꾼다
    let ids = req.query.id.split(',')
    productIds = ids.map(item => {
      return item
    })
  }

  ///products_by_id를 이용해 db에서 product와 같은 상품의 정보를 가져온다

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if(err) return res.status(400).send(err)
      return res.status(200).send(product)
    })

})

module.exports = router;
