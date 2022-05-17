const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    
    Favorite.find({ "productId": req.body.productId })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true , favoriteNumber: info.length })
        })
   
})

router.post('/favorited', (req, res) => {

    Favorite.find({ "productId": req.body.productId, "userFrom" : req.body.userFrom})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
           
            let result = false;
            if(info.length !== 0){
                result = true
            }

             res.status(200).json({ success:true , favorited: result })
        })
   
})


router.post('/removeFromFavorite', (req, res) => {
    
    Favorite.findOneAndDelete({ productId: req.body.productId, userFrom : req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success : true, doc })
        })

})

router.post('/addToFavorite', (req, res) => {
    
    const favorite = new Favorite(req.body)
    
    favorite.save((err, doc) => {
        console.log(err)
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, doc })
    })
})

module.exports = router;
