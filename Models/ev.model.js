const mongoose = require("mongoose");
const evSchema = new mongoose.Schema({
  stationName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  totalPorts: {
    type: Number,
    requird: true,
  },
  availablePorts: {
    type: Number,
    requird: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  }
});

const EvModel = mongoose.model("EvModel", evSchema);
module.exports = {EvModel};
