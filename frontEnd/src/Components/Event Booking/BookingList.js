import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {  getBookingEventsById } from '../../Actions/EventActions'

const BookingList = ({ getBookingEventsById, user,eventListById}) => {
    // console.log("useruseruser",user?._id)

    useEffect(() => {
            getBookingList()
    },[user])

    const getBookingList = async()=> {
       await getBookingEventsById(user?._id)
    }

    const dateformat = (date) => moment(date).format("DD/MM/YYYY")

    return (
        <table className='table'>
            <thead className="thead-light">
                <tr>
                    <th>Event Type</th>
                    <th>Event Name</th>
                    <th>Event Place</th>
                    <th>No. of Guests</th>
                    <th>Event price</th>
                    <th>Event Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {eventListById.map((item) => (
                    <tr key={item._id}>
                        <td>{item.eventType}</td>
                        <td>{item.eventName}</td>
                        <td>{item.eventPlace}</td>
                        <td>{item.noOfGuest}</td>
                        <td>{item.eventPrice}</td>
                        <td>{dateformat(item.eventDate)}</td>
                        <td className={item.status == "Approved"?"text-success fw-bold": item.status == "Rejected" ?"text-danger fw-bold":"text-dark"}>{item.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => {
    const { bookingEventList, eventListById } = state.events
    const { user } = state.users
    return { bookingEventList, eventListById, user }
  }

export default connect(mapStateToProps,{getBookingEventsById}) (BookingList)