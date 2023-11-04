const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    adds: { type: String, required: true },
    phone: { type: Number, required: true },
    date: { type : String },
    endDate: { type : String },
    price: { type: Number, require: true },
    status: { type: String, default: '1'},

}, { timestamps: true });

const EventBookingSchema = new mongoose.Schema({
    createdBy: { type: String},
    eventType: { type: String, required: true },
    eventName: { type: String, required: true },
    eventPlace: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventPrice: { type: Number, require: true },
    noOfGuest: { type : Number, require: true },
    status: { type: String, default: 'Pending'}

}, { timestamps: true });

module.exports =  {
    EventModel : mongoose.model("event", EventSchema),
    EventBookingModel : mongoose.model("eventBookings", EventBookingSchema),
 }

