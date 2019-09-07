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
        }
      ],
      sentiment: 0
    });
});

module.exports = router;
