var http = require('http');
var https = require('https');
var fs = require('fs');
var net = require('net');
var url = require('url');
const crypto = require('crypto');

var username = process.env['username'] || 'land007';
var password = process.env['password'] || '81dc9bdb52d04dc20036dbd8313ed055';
var domainName = process.env['DOMAIN_NAME'] || "voice.qhkly.com"; // e.g., "westus"

function request(cReq, cRes) {
	console.log('request.headers', cReq.headers);
	const proxyAuth = cReq.headers['proxy-authorization'.toLowerCase()];
	console.log('proxyAuth', proxyAuth);//bGFuZDAwNzoxMjM0
	if (proxyAuth) {
		const credentials = proxyAuth.replace('Basic', '');
		const parsedCredentials = Buffer.from(credentials, 'base64').toString(); //converting from base64
        const [user, pass] = parsedCredentials.split(':');
        console.log(username, password);
        const md5 = crypto.createHash('md5');
        if (pass === undefined) {
    		md5.update('undefined');
    	} else {
    		md5.update(pass);
    	}
    	var _pass = md5.digest('hex');
    	if (user !== username || _pass !== password) {
    		console.log(user, username, user !== username);
    		console.log(_pass, password, _pass !== password);
    		console.log('return');
    		return;
    	}
	}
	
    var u = url.parse(cReq.url);

    var options = {
        hostname : u.hostname, 
        port     : u.port || 80,
        path     : u.path,       
        method     : cReq.method,
        headers     : cReq.headers
    };

    var pReq = http.request(options, function(pRes) {
        cRes.writeHead(pRes.statusCode, pRes.headers);
        pRes.pipe(cRes);
    }).on('error', function(e) {
        cRes.end();
    });

    cReq.pipe(pReq);
}

function connect(cReq, cSock) {
	console.log('request.connect', cReq.headers);
	const proxyAuth = cReq.headers['proxy-authorization'.toLowerCase()];
	console.log('proxyAuth', proxyAuth);//bGFuZDAwNzoxMjM0
	if (proxyAuth) {
		const credentials = proxyAuth.replace('Basic', '');
		const parsedCredentials = Buffer.from(credentials, 'base64').toString(); //converting from base64
        const [user, pass] = parsedCredentials.split(':');
        console.log(username, password);
        const md5 = crypto.createHash('md5');
        if (pass === undefined) {
    		md5.update('undefined');
    	} else {
    		md5.update(pass);
    	}
    	var _pass = md5.digest('hex');
    	if (user !== username || _pass !== password) {
    		console.log(user, username, user !== username);
    		console.log(_pass, password, _pass !== password);
    		console.log('return');
    		return;
    	}
	}
	
    var u = url.parse('http://' + cReq.url);

    var pSock = net.connect(u.port, u.hostname, function() {
        cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        pSock.pipe(cSock);
    }).on('error', function(e) {
        cSock.end();
    });

    cSock.pipe(pSock);
}

process.on('uncaughtException', function(err) {
    console.log(err.stack);
    console.log('NOT exit...');
});

http.createServer()
    .on('request', request)
    .on('connect', connect)
    .listen(8080, '0.0.0.0');

var options = {
    key: fs.readFileSync('./' + domainName + '_key.key'),
    cert: fs.readFileSync('./' + domainName + '_chain.crt')
};

https.createServer(options)
    .on('request', request)
    .on('connect', connect)
    .listen(8888, '0.0.0.0');