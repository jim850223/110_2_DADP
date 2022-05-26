var express = require('express');
var app = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/test', function(req, res, next) {
  res.send("cc")
});

app.post('/test', (req, res) => {
  const {test} = req.body;
  res.send(`${test}`);
})


module.exports = app;
