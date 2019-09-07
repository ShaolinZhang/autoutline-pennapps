const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.send([
    { 'start': 0, 'end': req.body.string.length, 'ind': 0, 'string': 'This is a part of the outline.' }
  ]);
});

module.exports = router;
