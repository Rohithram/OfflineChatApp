/**
 * ChatInfo model events
 */

'use strict';

import {EventEmitter} from 'events';
var ChatInfoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChatInfoEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(ChatInfo) {
  for(var e in events) {
    let event = events[e];
    ChatInfo.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ChatInfoEvents.emit(event + ':' + doc._id, doc);
    ChatInfoEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ChatInfoEvents;
