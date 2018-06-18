var localtunnel = require('localtunnel');

var tunnel = localtunnel(8081, function(err, tunnel) {
    if (err) {
        console.log(JSON.stringify(err, null, 2));
    }
    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    tunnel.url;
    console.log('tunnel url: ' + tunnel.url);
});

tunnel.on('close', function() {
    // tunnels are closed
});

