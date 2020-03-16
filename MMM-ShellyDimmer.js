/******************
*  MMM-ShellyDimmer v2  *
*  Bugsounet      *
******************/

Module.register("MMM-ShellyDimmer", {
    defaults: {
      ip: "192.168.88.165",
      delay: 2* 60 * 1000,
      text: "Shelly Dimmer testing:",
      counter: true,
      debug: true,

      init_level: 10
    },

    start: function () {
      mylog_ = function() {
        var context = "[ShellyDimmer]"
        return Function.prototype.bind.call(console.log, console, context)
      }()

      mylog = function() {
        //do nothing
      }
      this.counter = 0
      this.interval = null
      this.current = 0
      this.config = Object.assign({}, this.default, this.config)
      this.helperConfig = {
          "debug": this.config.debug
      }
      if (this.config.debug) mylog = mylog_
      this.sendSocketNotification("CONFIG", this.config)
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 0, value: this.config.init_level})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 1, value: this.config.init_level})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 2, value: this.config.init_level})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 3, value: this.config.init_level})
      mylog("is now started")
    },

    socketNotificationReceived: function (notification, payload) {
      switch(notification) {
        case "PRESENCE":
          this.sendNotification("USER_PRESENCE", payload)
          break
        case "WAKE_UP":
          break
      }
    },

    notificationReceived: function (notification, payload) {
      switch(notification) {
        case "DOM_OBJECTS_CREATED":
          //this.sendSocketNotification("START")
          //this.turn_off()
          break
        case "USER_PRESENCE":
          if (payload == true) {
            this.sendSocketNotification("WAKEUP")
          } else this.ForceExpire()
          break
        case "SHELLYDIMMER_ON":
          this.turn_on()
          break
        case "SHELLYDIMMER_OFF":
          this.turn_off()
          break
        case "SHELLYDIMMER_L_1":
          this.set(1)
          break
        case "SHELLYDIMMER_L_2":
          this.set(2)
          break
        case "SHELLYDIMMER_L_3":
          this.set(3)
          break
        case "SHELLYDIMMER_L_4":
          this.set(4)
          break
        case "SHELLYDIMMER_L_X":
          this.setx()
          break
        case "SHELLYDIMMER_L_Y":
          this.sety()
          break
        default :
          break
      }
    },

    turn_on: function() {
      var self = this
      clearInterval(this.interval)
      this.current = 0
      this.interval = setInterval(function () {
        // http://192.168.88.174/white/0?turn=on&brightness=100
        var tmp = self.current;
        if (tmp == 2) tmp = 3;
        else if (tmp == 3) tmp = 2;
        self.sendSocketNotification("SET_BRIGHTNESS", {id: tmp, value: self.config.init_level})

        self.current += 1
        if (self.current > 3) {
          //self.sendSocketNotification("TIMER_EXPIRED")
          clearInterval(self.interval)
        }
      }, 200)
    },

    turn_off: function() {
      var self = this
      clearInterval(this.interval)
      this.current = 0
      this.interval = setInterval(function () {
        // http://192.168.88.174/white/0?turn=on&brightness=100
        var tmp = self.current;
        if (tmp == 2) tmp = 3;
        else if (tmp == 3) tmp = 2;
        self.sendSocketNotification("SET_BRIGHTNESS", {id: tmp, value: 0})

        self.current += 1
        if (self.current > 3) {
          //self.sendSocketNotification("TIMER_EXPIRED")
          clearInterval(self.interval)
        }
      }, 200)
    },

    set: function(level) {
      log(level)
      clearInterval(this.interval)
      var value = 0
      switch(level) {
        case 1:
          value = 10
          break
        case 2:
          value = 40
          break
        case 3:
          value = 70
          break
        case 4:
          value = 100
          break
      }
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 0, value: value})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 1, value: value})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 2, value: value})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 3, value: value})
    },

    setx: function() {
      clearInterval(this.interval)
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 0, value: 0})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 1, value: 50})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 2, value: 50})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 3, value: 0})
    },

    sety: function() {
      clearInterval(this.interval)
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 0, value: 60})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 1, value: 0})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 2, value: 0})
      this.sendSocketNotification("SET_BRIGHTNESS", {id: 3, value: 60})
    },

    ForceExpire: function(){
      clearInterval(this.interval)
      this.sendSocketNotification("TIMER_EXPIRED")
    },

    getDom: function () {
      var dom = document.createElement("div")
      dom.id = "SHELLYDIMMER"
      if (!this.config.counter) dom.className = "hidden"

      return dom
    },

    getStyles: function () {
      return ["MMM-ShellyDimmer.css"]
    },

    getScripts: function () {
      return ["moment.js"]
    }

});
