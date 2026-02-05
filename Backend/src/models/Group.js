const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false }
);

const routeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // client-side id (Date.now().toString())
    name: { type: String, required: true },
    distance: { type: String, required: true }, // e.g. "5.2 km"
    unit: { type: String, default: 'km' },
    origin: { type: coordinateSchema, required: true },
    destination: { type: coordinateSchema, required: true },
    coordinates: { type: [coordinateSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const groupSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    members: {
      type: Number,
      default: 0,
    },
    routes: {
      type: [routeSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

