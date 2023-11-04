import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getBookingEvents } from '../../Actions/EventActions';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import API from '../../Configs/app-config'
import { NotificationManager } from 'react-notifications';

const BookingList = ({ getBookingEvents, bookingEventList }) => {

    useEffect(() => {
        getBookingEvents()
    }, [])

    const handleEventApprove = (e, id) => {
        API.put(`event/event_approve/${id}`)
        .then((res)=>{
            NotificationManager.success(res.data.message)
            getBookingEvents()
        })
    }

    const handleEventReject = (e, id) => {
        API.put(`event/event_reject/${id}`)
        .then((res)=>{
            NotificationManager.success(res.data.message)
            getBookingEvents()
        })
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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookingEventList.map((item) => (
                    <tr key={item._id}>
                        <td>{item.eventType}</td>
                        <td>{item.eventName}</td>
                        <td>{item.eventPlace}</td>
                        <td>{item.noOfGuest}</td>
                        <td>{item.eventPrice}</td>
                        <td>{dateformat(item.eventDate)}</td>
                        <td>{item.status}</td>
                        <td>
                            {item.status == "Pending" ?
                                <div className='d-flex justify-content-center gap-2'>
                                    <FaThumbsUp onClick={(e)=> handleEventApprove(e, item._id)}/> <FaThumbsDown onClick={(e)=> handleEventReject(e, item._id)}/> </div>
                                : item.status == "Approved" ? <span className='text-success'>{item.status}</span>
                                    : <span className='text-danger'>{item.status}</span>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => {
    const { bookingEventList } = state.events
    return { bookingEventList }
}

export default connect(mapStateToProps, { getBookingEvents })(BookingList)