var localtunnel = require('localtunnel');
var admin = require('firebase-admin');

var serviceAccount = process.env.FIREBASE_CONFIG;
var serviceAccountJson = JSON.parse(serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson),
    databaseURL: process.env.DATABASE_URL
});
//
var db = admin.database();

var ref = db.ref('publicServerUrl');

ref.on("value", function(snapshot) {
    console.log("Database public server url set to: " + snapshot.val());
});

var tunnel = localtunnel(process.env.PORT, function(err, tunnel) {
    if (err) {
        console.log(JSON.stringify(err, null, 2));
    }

    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    ref.set(tunnel.url);

    console.log("Local port being forwarded: " + process.env.PORT);
    console.log('Tunnel url: ' + tunnel.url);
});

tunnel.on('close', function() {
    console.log("Tunnel closed.");
});

