var Base = require('./AQLSend');

module.exports = Sms;

function Sms(options, params){
  var params = params || {};
  this.options = options;
  this.options.delivery_url = this.options.delivery_host + params.delivery_url_path;//needs to contain some info about the sms that is being sent! - 'http://secure.holidayextras.co.uk/sms_delivery_report.php?reportcode=%code&destinationnumber=%dest&job_id=%jobid';//our provider AQL needs %code and %dest sent to them
  this.options.originator = params.originator || "HExtras";
  this.options.path = params.path || '/sms/sms_gw.php';
  this.prototype = new Base(this.options);
}

Sms.prototype.prepare = function(params){
  var params = params || {};
  var data = {};
  data.replace_sms = params.replace || 0;//special kind of text message that replaces one already sent
  data.flash = params.flash || 0;//special kind fo text that shows up on screen only, doesnt get stored, costs more to send!
  if(params.max_concatination){
    data.max_concat = params.max_concatination;
  }
  if(params.send_time){
    data.sendtime = params.send_time;
  }
  if(params.unix_send_time){
    data.unix_sendtime = params.unix_send_time;
  }
  data.dlr_url = this.options.delivery_url + '?reportcode=%code&destinationnumber=%dest';//add our own identifier like jobid here (plus this has to be a GET request)
  if(params.allow_unicode){
    data.allow_unicode = params.allow_unicode;
  }
  data.message = params.message;
  if(params.destination){
    data.destination = params.destination;
  }
  if(params.destinations){
    //implode the array into this.destination, comma seperated
  }
  return data;
}

Sms.prototype.send = function(params, callback){
  this.prototype.send(params, function(response){
    //returned is a string 
    //"<status no>:<no of credits used> <description>" - eg: 2:0 Authentication error
    /*The status corresponds to one of the following:
    0: SMS successfully queued
    1: SMS queued partially
    2: Authentication error
    3: Destination number(s) error
    4: Send time error
    5: Insufficient credit or invalid number of msg/destination
    9: Undefined error*/

    //sort out the data
    var sortedData = {};
    if(typeof callback == 'function'){
        callback(sortedData);
    }
    

  });
}