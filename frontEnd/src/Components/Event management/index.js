import React, { useState } from 'react';
import EventList from './Events';
import '../../Assets/style.css';
import { eventCreate, getEvents } from '../../Actions/EventActions'
import { connect, useDispatch } from 'react-redux';
import Customers from './Customers';
import BookingEvents from '../Event Booking/index';
import NewBookingList from './BookingList'
import { useNavigate } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'

const Eventmanagement = ({ user, getEvents }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [eventDatas, setEventDatas] = useState({
    name: '',
    type: '',
    adds: '',
    phone: '',
    date: '',
    endDate: '',
    price: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setEventDatas(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, type: type, adds, date, price, phone, endDate } = eventDatas
    setSubmitted(true)
    if (name != "" && type != "" && adds != "" && date != "" && endDate != "" && price != "" && phone != "") {
      dispatch(eventCreate(eventDatas))
      getEvents()
    }
    else {
      return
    }
  }

  const handleLogout = () => { navigate('/home') }

  return (
    <>
      <section className="p-3 justify-content-center vh-100">
        <div className="container-fluid py-3 h-100">
          <div className="d-flex justify-content-center align-items-center">
            <div className="col col-xl-7 col-md-12 col-lg-12">
              <nav className='nav nav-tabs' style={{ backgroundColor: "#fff", borderRadius: '20px' }}>
                <div className="nav nav-tabs justify-content-between" style={{ width: "100%" }} id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                    Add Event
                  </button>
                  <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-activity" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                    Manage Events
                  </button>
                  <button className="nav-link" id="nav-customer-tab" data-bs-toggle="tab" data-bs-target="#nav-customers" type="button" role="tab" aria-controls="nav-customer" aria-selected="false">
                    Customers
                  </button>
                  <button className="nav-link" id="nav-blist-tab" data-bs-toggle="tab" data-bs-target="#nav-blist" type="button" role="tab" aria-controls="nav-blist" aria-selected="false">
                    New Bookings
                  </button>
                  <button className="nav-link" onClick={handleLogout} id="nav-logout-tab" type="button">
                    <FaRegArrowAltCircleLeft /> Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <div className="tab-content mt-3" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-home-tab">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-7">
                  <div className="card shadow-2-strong container_card">
                    <div className="row g-0">
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="card-body p-3 p-lg-4 text-black">

                          <form onSubmit={handleSubmit}>
                            <h4 className="d-flex justify-content-center" style={{ letterSpacing: "1px" }}>Welcome</h4>

                            <div className='row'>
                              <div className="form-outline mb-3 col-lg-6 col-12 col">
                                <label className="form-label" htmlFor="form2Example17">Name</label>
                                <input type="text" name='name' id="form2Example17" placeholder='Enter your Event name' className="form-control form-control-md"
                                  value={eventDatas.name} onChange={handleChange} />
                                {!eventDatas.name && submitted && <span className='text-danger'>*Required</span>}
                              </div>

                              <div className="form-outline mb-3 col-lg-6 col-12 col">
                                <label className="form-label" htmlFor="form2Example47">Type</label>
                                <select className="form-select" name='type' aria-label="Default select example"
                                  value={eventDatas.type} onChange={handleChange} >
                                  <option value="">Select</option>
                                  <option value="Party">Party</option>
                                  <option value="Wedding">Wedding</option>
                                  <option value="Meeting">Meeting</option>
                                  <option value="Conference">Conference</option>
                                </select>
                                {!eventDatas.type && submitted && <span className='text-danger'>*Required</span>}
                              </div>
                            </div>

                            <div className='row'>
                              <div className="form-outline mb-3 col-lg-6 col-12 col">
                                <label className="form-label" htmlFor="form2Example10">Place</label>
                                <input type="text" name='adds' id="form2Example10" placeholder='Enter your place' className="form-control form-control-md"
                                  value={eventDatas.adds} onChange={handleChange} />
                                {!eventDatas.adds && submitted && <span className='text-danger'>*Required</span>}
                              </div>

                              <div className="form-outline mb-3 col-lg-6 col-12 col">
                                <label className="form-label" htmlFor="form2Example37">Phone</label>
                                <input type="number" name='phone' id="form2Example37" placeholder='Enter your Phone' className="form-control form-control-md"
                                  value={eventDatas.phone} onChange={handleChange} />
                                {!eventDatas.phone && submitted && <span className='text-danger'>*Required</span>}
                              </div>
                            </div>

                            <div className='row'>
                              <div className="form-outline mb-3 col-lg-6 col-12 col">
                                <label className="form-label" htmlFor="form2Example87">Start Date</label>
                                <input type="date" name='date' id="form2Example87" min={0} className="form-control form-control-md"
                                  value={eventDatas.date} onChange={handleChange} />
                                {!eventDatas.date && submitted && <span className='text-danger'>*Required</span>}
                              </div>
                              <div className="form-outline mb-3 col-lg-6 col-12 col">
                                <label className="form-label" htmlFor="form2Example87">End Date</label>
                                <input type="date" name='endDate' id="form2Example87" min={0} className="form-control form-control-md"
                                  value={eventDatas.endDate} onChange={handleChange} />
                                {!eventDatas.endDate && submitted && <span className='text-danger'>*Required</span>}
                              </div>
                            </div>
                            <div className='row'>
                              <div className="form-outline mb-3 col-lg-6 col-12 col">
                                <label className="form-label" htmlFor="form2Example37">$ Price</label>
                                <input type="number" name='price' id="form2Example37" placeholder='Enter your price' className="form-control form-control-md"
                                  value={eventDatas.price} onChange={handleChange} />
                                {!eventDatas.price && submitted && <span className='text-danger'>*Required</span>}
                              </div>
                            </div>

                            <div className="pt-1 mb-3">
                              <button className="btn btn-primary btn-md btn-block" type="submit">Submit</button>
                            </div>

                          </form>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-activity" role="tabpanel" aria-labelledby="nav-activity-tab">
              <EventList />
            </div>
            <div className="tab-pane fade" id="nav-customers" role="tabpanel" aria-labelledby="nav-customers-tab">
              <Customers />
            </div>
            <div className="tab-pane fade" id="nav-blist" role="tabpanel" aria-labelledby="nav-blist-tab">
              <NewBookingList />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = ({ users }) => {
  return users
}
export default connect(mapStateToProps, { eventCreate, getEvents })(Eventmanagement);