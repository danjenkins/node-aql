var https = require('https');
var http = require('http');
var querystring = require('querystring');

module.exports = AQLSend;

function AQLSend(params){
  this.options = params;
}

AQLSend.prototype.send = function(data, callback){
  
  var self = this;

  data.username = self.options.username;
  data.password = self.options.password;
  data.originator = self.options.originator;

  if(self.options.method == 'GET'){
    self.options.path = self.options.path + '?' + querystring.stringify(data);
  }

  var req = https.request({
    host: self.options.hostname,
    port: self.options.port,
    path: self.options.path,
    method: self.options.method
  }, function(res) {
    res.setEncoding('utf8');
    var response = '';
    res.on('data', function (chunk) {
      response += chunk;
    }).on('end', function(){
      //should get some raw text back here
      if(typeof callback == 'function'){
        callback(response);
      }
    }).on('close', function(){
    
    });
  });

  req.on('error', function(e) {
    var response = 'error';
    if(typeof callback == 'function'){
      callback(response);
    }
  });

  if(self.options.method == 'POST'){
    // write data to request body
    //req.write();
  }
  req.end();
}