import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { customer_Edit, userLogout } from '../../Actions/customerActions';
import Booking from './NewBooking';
import BookingList from './BookingList';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const EventBooking = ({ user, userLogout }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [editDatas, setEditDatas] = useState(user);

    useEffect(() => {
        setEditDatas(user)
    }, [user])

    const handleChange = (e) => {
        setEditDatas(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(customer_Edit(editDatas))
    }

    const handleLogout = () => { 
        userLogout()
        navigate('/login')
    }

    const { f_Name, l_Name, email, phone, gender } = editDatas

    return (
        <section className="p-3 justify-content-center vh-100">
            <div className="container-fluid py-3 h-100 ">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="col col-xl-7 col-md-12 col-lg-12">
                        <nav className='nav nav-tabs' style={{ backgroundColor: "white", borderRadius: '20px' }}>
                            <div className="nav nav-tabs justify-content-between" style={{ width: "100%" }} id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                    My Details
                                </button>
                                <button className="nav-link" id="nav-book-tab" data-bs-toggle="tab" data-bs-target="#nav-book" type="button" role="tab" aria-controls="nav-book" aria-selected="false">
                                    Book Event
                                </button>
                                <button className="nav-link" id="nav-bookingList-tab" data-bs-toggle="tab" data-bs-target="#nav-bookingList" type="button" role="tab" aria-controls="nav-bookingList" aria-selected="false">
                                    My Bookings
                                </button>
                                <button className="nav-link" onClick={handleLogout} id="nav-logout-tab" type="button">
                                    <FaRegArrowAltCircleLeft /> Logout
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="tab-content mt-3" id="nav-tabContent">
                    {/* My details section */}
                    <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-7">
                                <div className="card shadow-2-strong container_card">
                                    <div className="row g-0">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="card-body p-4 p-lg-5 text-black">
                                                <form onSubmit={handleSubmit}>
                                                    <div className='row'>
                                                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                                                            <label className="form-label" htmlFor="form2Example17">First Name</label>
                                                            <input type="text" name='f_Name' id="form2Example17" placeholder='Enter your First name' className="form-control form-control-md"
                                                                value={f_Name} onChange={handleChange} />
                                                        </div>

                                                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                                                            <label className="form-label" htmlFor="form2Example27">Last Name</label>
                                                            <input type="text" name='l_Name' id="form2Example27" placeholder='Enter your Last name' className="form-control form-control-md"
                                                                value={l_Name} onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                                                            <label className="form-label" htmlFor="form2Example10">Email address</label>
                                                            <input type="email" name='email' id="form2Example10" placeholder='Enter your Email' className="form-control form-control-md"
                                                                value={email} onChange={handleChange} />
                                                        </div>
                                                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                                                            <label className="form-label" htmlFor="form2Example47">Gender</label>
                                                            <select className="form-select" name='gender' aria-label="Default select example" value={gender} onChange={handleChange}>
                                                                <option value="">Select</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                                                            <label className="form-label" htmlFor="form2Example87">Phone</label>
                                                            <input type="number" name='phone' id="form2Example87" min={0} placeholder='Enter your phone' className="form-control form-control-md"
                                                                value={phone} onChange={handleChange} />
                                                        </div>
                                                    </div>

                                                    <div className="pt-1 mb-3">
                                                        <button className="btn btn-primary btn-md btn-block" type="submit">Update</button>
                                                    </div>

                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-book" role="tabpanel" aria-labelledby="nav-book-tab">
                        <Booking />
                    </div>
                    <div className="tab-pane fade" id="nav-bookingList" role="tabpanel" aria-labelledby="nav-bookingList-tab">
                        <BookingList />
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    const { user } = state.users
    return { user }
}

export default connect(mapStateToProps, { customer_Edit, userLogout })(EventBooking)