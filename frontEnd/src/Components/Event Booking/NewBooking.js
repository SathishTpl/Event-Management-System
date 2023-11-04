import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getEvents, getBookingEventsById } from '../../Actions/EventActions'
import API from '../../Configs/app-config'
import { NotificationManager } from 'react-notifications'

const Booking = ({getEvents, eventList, getBookingEventsById, user}) => {
  const [bookingEvent, setBookingEvent] = useState({
    eventType: '',
    eventName: '',
    eventPlace: '',
    eventDate: '',
    eventPrice: '',
    noOfGuest: '',
    createdBy: user?._id

  })
  const [eventsData, setEventsData] = useState([])
  const [eventsAdds, setEventsAdds] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const handleChangeType = (e) => {
    const value = { ...bookingEvent }
    value.eventType = e.target.value
    setBookingEvent(value)
    let eventArr = eventList
    const getValues = eventArr.filter((item) => item.type === e.target.value)
    setEventsData(getValues)
  }

  const handleChangeEventName = (e) => {
    const value = { ...bookingEvent }
    value.eventName = e.target.value
    setBookingEvent(value)
    let eventNam = eventsData.filter((item) => item.name === e.target.value)
    setEventsAdds(eventNam[0].adds)
  }

  const handleChange = (e) => {
    setBookingEvent((prevstate) => ({ ...prevstate, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const { eventType, eventName, eventPlace, eventDate, eventPrice, noOfGuest } = bookingEvent    
    const data = {
      eventType,
      eventName,
      eventPlace,
      eventDate,
      eventPrice,
      noOfGuest,
      createdBy: user?._id
    }
    API.post(`/event/event_Booking`, data)
    .then((res)=>{
      NotificationManager.success(res.data.message);
      getBookingEventsById(res.data.data.createdBy)
    })
    .catch(err=>{
      NotificationManager.error(err.message);
  })

  }

  const { eventType, eventName, eventPlace, eventDate, eventPrice, noOfGuest } = bookingEvent

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-7">
        <div className="card shadow-2-strong container_card">
          <div className="row g-0">
            <div className="d-flex align-items-center justify-content-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={handleSubmit}>
                  <div className='row'>

                    <div className="form-outline mb-3 col-lg-6 col-12 col">
                      <label className="form-label " htmlFor="form2Example47">Event Type</label>
                      <select className="form-select" name='eventType' aria-label="Default select example"
                        value={eventType} onChange={handleChangeType} >
                        <option value="">Select</option>
                        <option value="Party">Party</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Conference">Conference</option>
                      </select>
                    </div>

                    <div className="form-outline mb-3 col-lg-6 col-12 col">
                      <label className="form-label " htmlFor="form2Example47"> Event Name</label>
                      <select className="form-select" name='eventName' aria-label="Default select example"
                        value={eventName} onChange={handleChangeEventName} >
                        <option value="">Select</option>
                        {eventsData.map((item) => (
                          <option key={item._id} value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='row'>
                    <div className="form-outline mb-3 col-lg-6 col-12 col">
                      <label className="form-label " htmlFor="form2Example47">Event Place</label>
                      <select className="form-select" name='eventPlace' aria-label="Default select example"
                        value={eventPlace} onChange={handleChange} >
                        <option value="">Select</option>
                        <option value={eventsAdds}>{eventsAdds}</option>
                      </select>
                    </div>
                    <div className="form-outline mb-3 col-lg-6 col-12 col">
                      <label className="form-label " htmlFor="form2Example87"> Event Date</label>
                      <input type="date" name='eventDate' id="form2Example87" className="form-control form-control-md"
                        value={eventDate} onChange={handleChange} />
                    </div>
                  </div>

                  <div className='row'>
                     <div className="form-outline mb-3 col-lg-6 col-12 col">
                      <label className="form-label" htmlFor="form2Example87"> No. of Guests </label>
                      <input type="number" name='noOfGuest' id="form2Example87" placeholder='Number of guests' className="form-control form-control-md"
                        value={noOfGuest} onChange={handleChange} />
                    </div>
                    <div className="form-outline mb-3 col-lg-6 col-12 col">
                      <label className="form-label" htmlFor="form2Example87"> Event Price</label>
                      <input type="number" name='eventPrice' id="form2Example87" placeholder='Enter your Price' className="form-control form-control-md"
                        value={eventPrice} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="pt-1 mb-2">
                    <button className="btn btn-primary btn-md btn-block" type="submit">Submit</button>
                  </div>

                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { eventList } = state.events
  const { user } = state.users
  return { eventList,user }
}

export default connect(mapStateToProps, { getEvents,getBookingEventsById })(Booking)