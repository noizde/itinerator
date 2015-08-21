var MicroEvent = require('../lib/microevent');

// Chunk contains
// label, location, time, earlyBuffer, prepareBuffer

var store = {
  chunks: [],
  createChunk: function(label, time, duration, location) {
    this.chunks.push({
      label: label,
      time: time,
      duration: duration,
      location: location
    });
  },
  createBuffer: function(label, time) {
    this.createChunk(label, time);
  },
  createTravel: function(label, time, duration) {
    this.createChunk(label, time, duration);
  },
  createActivity: function(label, time, duration, location) {
    this.createChunk(label, time, duration, location);
  },
  planActivity: function(chunk) {
    var duration = 60;
    var time = parseInt(chunk.time);
    var travelDuration = 60;
    var travelTime = time - travelDuration;
    var bufferDuration = this.chunks.length ? chunk.prepareBuffer : chunk.earlyBuffer;
    var bufferTime = travelTime - bufferDuration;
    this.createBuffer('Prepare to go to ' + chunk.label, bufferTime);
    this.createTravel('Leave for ' + chunk.label + ' at ' + chunk.location, travelTime, duration);
    this.createActivity(chunk.label, chunk.time, chunk.duration, chunk.location);
    store.trigger('chunkCreated');
  }
};

console.log('Stoor');
console.log(store);

console.log(typeof store);

MicroEvent.mixin(store);

module.exports = store;