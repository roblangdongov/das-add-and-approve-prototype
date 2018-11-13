
const express = require('express')
const router =  new express.Router()



// Route index page
router.get('/', function (req, res) {
  res.render('index')
})




module.exports = router