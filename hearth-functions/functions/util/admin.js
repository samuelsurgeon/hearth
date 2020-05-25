const admin = require('firebase-admin');
const serviceAccount = require('../hearth-prototype-firebase-adminsdk-76upf-c8abbbd70c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/project/hearth-prototype/database/firestore/data~2Fposts~2FHag1ji1lFQfXE9itFGCu'
});

const db = admin.firestore();

module.exports = { admin, db };

