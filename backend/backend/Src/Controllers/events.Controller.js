const {EventModel, EventBookingModel } = require("../Models/events.model")
const eventRouter = require('express').Router();

eventRouter.post("/add_event",  (request, response) => {

    const { name, type, adds, date, price, phone, endDate } = request.body
    let event = new EventModel;
    event.name = name;
    event.type = type;
    event.adds = adds;
    event.phone = phone;
    event.date = date;
    event.endDate= endDate;
    event.price = price;
    event.save()
         .then((data) => { response.status(200).send({ message: "Event added successfully", data: data }) })
         .catch((err) => { response.status(400).send({ message: err.message })  })
})

eventRouter.get("/getEvents", async(req, res)=>{
    try {
        const getEvents = await EventModel.find({})
        res.status(200).send({
            status: 'Events get successfully',
            data: getEvents
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

eventRouter.put('/event_delete/:id', async (req, res) => {
    try {
        const updateresult = await EventModel.findByIdAndUpdate({ _id: req.params.id },  {$set: {status: '0'}}, { new: true })
        res.status(200).send({
            message: 'Event deleted successfully',
            data: updateresult,
        })
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
})

eventRouter.put('/edit_event/:id', async (req, res) => {
    try {
        const updateEvent = await EventModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        res.status(200).send({
            message: 'Event updated successfully',
            data: updateEvent,
        })
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
})

/*********************Booking************************** */

eventRouter.post("/event_Booking",  (request, response) => {

    const { eventType, eventName, eventPlace, eventDate, eventPrice, noOfGuest, createdBy } = request.body
    let eventBooking = new EventBookingModel;
    eventBooking.eventType = eventType;
    eventBooking.eventName = eventName;
    eventBooking.eventPlace = eventPlace;
    eventBooking.eventDate = eventDate;
    eventBooking.eventPrice = eventPrice;
    eventBooking.noOfGuest = noOfGuest;
    eventBooking.createdBy = createdBy;
    eventBooking.save()
         .then((data) => { response.status(200).send({ message: "Event Booked successfully", data: data }) })
         .catch((err) => { response.status(400).send({ message: err.message })  })
})

eventRouter.get("/getBookingEvents", async(req, res)=>{
    try {
        const getBookingEvents = await EventBookingModel.find({})
        res.status(200).send({
            status: 'Booking Events get successfully',
            data: getBookingEvents
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

eventRouter.get("/getBookingEventsByUser/:id", async(req, res)=>{
    try {
        const getBookingEvents = await EventBookingModel.find({ createdBy: req.params.id })
        res.status(200).send({
            status: 'Booking Events get By id successfully',
            data: getBookingEvents
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

eventRouter.put('/event_approve/:id', async (req, res) => {
    try {
        const approveResult = await EventBookingModel.findByIdAndUpdate({ _id: req.params.id },  {$set: {status: 'Approved'}}, { new: true })
        res.status(200).send({
            message: 'Event Booking Approved',
            data: approveResult._id,
        })
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
})

eventRouter.put('/event_reject/:id', async (req, res) => {
    try {
        const rejectResult = await EventBookingModel.findByIdAndUpdate({ _id: req.params.id },  {$set: {status: 'Rejected'}}, { new: true })
        res.status(200).send({
            message: 'Event Booking rejected',
            data: rejectResult._id,
        })
    }
    catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = eventRouter;