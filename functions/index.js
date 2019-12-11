const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.hello = functions.https.onRequest((request, response) => {
    response.send("Hello" + JSON.stringify(request.query));
});

exports.helloName = functions.https.onRequest((request, response) => {
    const welcome = `Hello ${request.query.name}! `
    response.send(welcome)
});

exports.addOwner = functions.firestore
    .document('')


// const functions = firebase.functions()
// functions.httpsCallable('helloQuery')

