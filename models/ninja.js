const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create GeoLocation Schema

const GeoSchema = new Schema({
  type: {
    default: "Point",
    type: String,
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Field is required"],
  },
  rank: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  geometry: GeoSchema,
});

const Ninja = mongoose.model("ninja", NinjaSchema);

module.exports = Ninja;
