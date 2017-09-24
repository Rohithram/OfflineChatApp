'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './chatInfo.events';

var ChatInfoSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ChatInfoSchema);
export default mongoose.model('ChatInfo', ChatInfoSchema);
