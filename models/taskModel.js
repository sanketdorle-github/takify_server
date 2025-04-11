const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['PENDING', 'DONE'],
    default: 'PENDING'
  }
}, { timestamps: true });

taskSchema.plugin(mongoosePaginate);

const Task = mongoose.model('Task', taskSchema); // ✅ correct model creation
module.exports = Task; // ✅ export the model
