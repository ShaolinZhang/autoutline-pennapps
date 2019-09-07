const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// import routes
const outlineRoutes = require('./routes/outlines.js');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8000', credentials: true }));

app.use('/outlines', outlineRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started at port ' + PORT));
