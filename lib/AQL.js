var Sms = require('./Sms');


module.exports = AQL;

function AQL(params){
  var params = params || {};
  this.options = {};

  this.options.username = params.username;
  this.options.password = params.password;
  this.options.hostname = params.host || 'gw.aql.com'; //make it so it supports an array of hosts //$array_servers = array("gw1.aql.com","gw11.aql.com","gw2.aql.com","gw22.aql.com");
  this.options.port = params.port || '443';
  this.options.method = params.method || 'GET'

  //did we pass in express server?
  //need this to create a server that can deal with delivery reports/etc
  //maybe get a callback so that once we have a server, the user can specify routes etc
  this.options.delivery_host = false || 'http://www.dan-jenkins.co.uk';

}

AQL.prototype.sms = function(params){
  return new Sms(this.options, params);
}