const functions = require('firebase-functions');
const app = require('express')();

const { getAllPosts } = require('./handlers/posts');
const { signup, login } = require('./handlers/users');

const firebase = require('firebase');
firebase.initializeApp(config);

app.get('/posts', getAllScreams);
app.post('/post', FBAuth, postOnePost);

const FBAuth = (req, res, next) => {
  let idToken;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return res.status(403).json({ error: 'Unauthorised' });
  }

  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      console.log(decodedToken);
      return db.collection('user')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
      req.user.handle = data.docs[0].data().handle;
      return next();
    })
    .catch(err => {
      console.error('Error whilst verifying token: ', err);
      return res.status(403).json(err);
    });
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
}

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
}

app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.https.onRequest(app);
