var Q = require('q');
var BaseApp = require('./base');
var KEY_CODES = require('../key-codes')

function HuluKeyboardConverter(query) {
  var pos = 14; //N
  var map = {};
  var alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = 0; i < alpha.length; i++) {
    map[alpha.charAt(i)] = i;
  }

  var keys = [];
  var chars = query.toUpperCase().split('');
  for (var j = 0; j < chars.length;j++) {
    var nextPos = map[chars[j]];
    var diff = nextPos - pos;
    while(diff > 0) { keys.push(KEY_CODES.DPAD_RIGHT); diff--; }
    while(diff < 0) { keys.push(KEY_CODES.DPAD_LEFT); diff++; }
    keys.push(KEY_CODES[chars[j]], KEY_CODES.DPAD_CENTER);
    pos = nextPos;
  } 
  
  return keys;
}
  
function Hulu() {}
BaseApp.extend(Hulu);

Hulu.prototype.pkg = 'com.hulu.plus/com.hulu.livingroomplus.MainActivity';

Hulu.prototype.afterOpen = function(queue) {
  return Q.delay(12000);
}

Hulu.prototype.findAndPlay =  function(queue, query) {
  return Q.delay(1)
    .then(function() {
      return queue.sendKeys([KEY_CODES.DPAD_UP, KEY_CODES.DPAD_CENTER]);
    })
    .delay(1000)
    .then(function() {
      return queue.sendKeys(HuluKeyboardConverter(query))    
    })
    .delay(7000)
    .then(function() {
      return queue.sendKeys([
        KEY_CODES.DPAD_DOWN,
        KEY_CODES.DPAD_RIGHT,
        KEY_CODES.DPAD_CENTER
      ]);
    });
}

module.exports = Hulu;

