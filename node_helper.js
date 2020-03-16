/********************************
* node_helper for MMM_ShellyDimmer v2 *
* BuGsounet                     *
********************************/

const NodeHelper = require('node_helper')
const request = require('request');

var _log = function() {
    var context = "[ShellyDimmer]"
    return Function.prototype.bind.call(console.log, console, context)
}()

var log = function() {
  //do nothing
}

module.exports = NodeHelper.create({

  start: function() {
    console.log('Starting node_helper for module ' + this.name)
    this.running = false
  },

  initialize: function() {
    console.log("[ShellyDimmer] Initialize...")
    var debug = (this.config.debug) ? this.config.debug : false
    if (debug == true) log = _log
    this.running = true

    process.on('beforeExit', (code) => {
      console.log('[ShellyDimmer] Thanks for using this addon')
    });

    process.on('exit', (code) => {
      console.log('[ShellyDimmer] ByeBye !')
      console.log('[ShellyDimmer] @bugsounet')
    });
    console.log("[ShellyDimmer] Initialize Complete Version:", require('./package.json').version)
  },

  socketNotificationReceived: function (notification, payload) {
    switch(notification) {
      case "INIT":
        this.conf = payload
        this.initialize()
        break
      case "CONFIG":
        this.config = payload
        this.initialize()
        break
      case "START":
        break
      case "TIMER_EXPIRED":
        this.running = false
        this.sendSocketNotification("PRESENCE", false)
        break
      case "WAKEUP":
        this.running = true
        this.sendSocketNotification("PRESENCE", true)
        log("Wake Up Detected.")
        break
      case "SET_BRIGHTNESS":
        log('http://'+this.config.ip+'/white/'+payload.id+'?turn='+(payload.value>0?'on':'off')+'&brightness='+payload.value)
        request({
               url: 'http://'+this.config.ip+'/white/'+payload.id+'?turn='+(payload.value>0?'on':'off')+'&brightness='+payload.value,
            method: 'GET'
        }, (error, response, body) => {
        log(body)
            if (!error && response.statusCode == 200) {
                //var result = JSON.parse(body).articles;
                //this.sendSocketNotification('NATGEO_RESULT', result);
            }
        });
        break
    }
  }

});
