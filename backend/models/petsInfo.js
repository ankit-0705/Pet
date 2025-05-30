const mongoose = require('mongoose')
const { Schema } = mongoose;

const petSchema = new Schema({
  name:{type: String, required:true},
  hunger: {type: Number, default: 50 }, // Ranges from 0-100
  happiness: {type: Number, default: 50},
  energy: {type: Number, default: 50},
  lastUpdated:{type: Date, default: Date.now}
});

module.exports = mongoose.model('petInfo',petSchema);