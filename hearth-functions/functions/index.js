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

exports.api = functions.https.onRequest(app);
