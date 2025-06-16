const express = require('express');
const router = express.Router();



// get all products
router.get('/', (req, res) => {
  res.send("hello");
});



module.exports = router;