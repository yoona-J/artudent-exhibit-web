const express = require('express');
const router = express.Router();
const { Application } = require("../models/Application");
const { auth } = require("../middleware/auth");

//=================================
//          Application
//=================================

router.post('/', (req, res) => {

    //받아온 정보들을 DB에 넣어준다
    // console.log(req.body)
    const application = new Application(req.body)
    application.save((err) => {
      console.log('err', err)
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true })
    })
  
})

module.exports = router;