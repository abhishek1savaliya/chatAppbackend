const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema({
  sender: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  receiver: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});


messageSchema.index({ sender: 1, receiver: 1 });

module.exports = mongoose.model('Message', messageSchema);
