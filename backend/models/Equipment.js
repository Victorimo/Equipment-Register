const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'In Use', 'Maintenance'],
  },
  assignedTo: {
    type: String,
  },
  location: {
    type: String,
  },
  cost: {
    type: Number,
    required: true, 
  },
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
