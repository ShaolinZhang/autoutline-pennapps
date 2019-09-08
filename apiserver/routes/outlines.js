const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.send({
      topics: [
        {
          'range': [0,2],
          'ind': 0,
          'string': 'This is a part of the outline.'
        },
        {
          'range': [4,8],
          'ind': 1,
          'string': 'This is a part of the outline second.'
        }
      ],
      sentiment: -0.32323
    });
});

module.exports = router;
