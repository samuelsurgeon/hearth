const functions = require('firebase-functions');
const app = require('express')();

const { getAllPosts } = require('./handlers/posts');
const { signup, login } = require('./handlers/users');

const firebase = require('firebase');
firebase.initializeApp(config);

app.get('/posts', getAllScreams);
app.post('/post', FBAuth, postOnePost);
app.post('/signup', signup);
app.post('/login', login);

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
}

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
}


exports.api = functions.https.onRequest(app);
