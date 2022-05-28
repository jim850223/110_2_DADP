var express = require('express');
var app = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

app.post('/test', (req, res) => {
  const {test} = req.body;
  res.send(`${test}`);
})

/* app.post('/register', async (req, res) => {
  //res.send(req.body);
  const { password, username, email } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
      username: username,
      password: hash,
      email: email
  })
  await user.save();
  req.session.user_id = user._id;
  res.redirect('/')
}) */

app.post('/register', async (req, res) => {
  //res.send(req.body);
  const { password, username, email } = req.body;
  const name = req.body.collectionSet.name;
  const favorite = req.body.collectionSet.favorite;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
      username: username,
      password: hash,
      email: email,
      //Have a hard time to handle if there is more than one collections to be added
      collectionSet: [{
        name : name,
        favorite: favorite
      }]
  })
  await user.save();
  req.session.user_id = user._id;
  res.send("1")
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  //Be careful, you should use findOne instead of find
  const user = await User.findOne({ username: username })
  const validPassword = await bcrypt.compare(password, user.password)
  if (validPassword) {
      req.session.user_id = user._id;      
      //'1' stands for "Logged in successfully"

      res.send('1')
  }
  else {
      //'0' stands for "Fail to log in"
      res.send('0')
  }
})

app.post('/logout', (req, res) => {
  req.session.user_id = null;
  //You can also use destroy if you have more information
  req.session.destroy();
  res.send('1');
})


module.exports = app;
