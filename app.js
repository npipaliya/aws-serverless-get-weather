'use strict';
let http = require('http');
let request = require('request');

var ApiBuilder = require('claudia-bot-builder'),
  api = new ApiBuilder();

module.exports = api;

api.get('/weather/city/{city}', function (request) {
		
    var url = "http://api.openweathermap.org/data/2.5/weather?q=";
        url += request.pathParams.city + "&APPID=38cc1b4fc2188ce026b03953e0857c55&units=metric";
        
	return httprequest(url).then((data) => {
        const response = {
            statusCode: 200,
            body: JSON.parse(data),
        };
    return response;
    });
});

function httprequest(url) {
     return new Promise((resolve, reject) => {
        
        const req = http.request(url, (res) => {
          if (res.statusCode != 200) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                try {
                    console.log("Got response: " + res.statusCode);
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
          reject(e.message);
        });
       req.end();
    });
}