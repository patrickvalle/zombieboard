(function(Polymer) {

  var DAY_NAMES = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  var MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Polymer definition
  Polymer({
    is: 'zombie-block-clock',
    behaviors: [ZombieBlockBehavior],
    properties: {
      militaryTime: {
        type: Boolean,
        value: false
      }
    },
    created: function() {
      this.setDimensions(2, 1);
    },
    ready: function() {
      this.populateProperties(this);
      var _this = this;
      setInterval(function() {
        _this.populateProperties(_this);
      }, 1000);
    },
    populateProperties: function(_this) {
      var now = new Date();
      var zeroPad = function(value) {
        return ('00' + value).slice(-2);
      };
      if(!_this.militaryTime && now.getHours() > 12) {
        _this.hours = zeroPad((now.getHours() - 12));
      }
      else {
        _this.hours = zeroPad(now.getHours());
      }
      _this.minutes = zeroPad(now.getMinutes());
      _this.day = DAY_NAMES[now.getDay()];
      _this.month = MONTH_NAMES[now.getMonth()];
      _this.date = now.getDate();
    }
  });

}(window.Polymer));