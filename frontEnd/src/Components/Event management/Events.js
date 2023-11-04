import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../Assets/style.css'
import { getEvents, eventDelete, eventEdit } from '../../Actions/EventActions';
import { connect, useDispatch } from 'react-redux';
import { AiOutlineUserAdd, AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import moment from 'moment'

const Events = ({ getEvents, eventList }) => {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [editDatas, setEditDatas] = useState('');
  const [ date, setDate ] = useState('')

  const handleClose = () => setShow(false);

  useEffect(() => {
    getEvents()
  }, [])

  const handleEditEvent = (id, data) => {
    setShow(true);
    setEditDatas(data);
    const formattedDate = moment(data.date, 'D/M/YYYY').format('YYYY-MM-DD');
    setDate(formattedDate)
  }
  const handleDeleteEvent = (id) => {
    dispatch(eventDelete(id))
    getEvents()
  }

  const handleChange = (e) => {
    setEditDatas(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(eventEdit(editDatas))
    setShow(false)
    getEvents()
  }

  const dateformat = (date) => moment(date).format("DD/MM/YYYY")

  return (
    <><Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Event Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="card shadow-2-strong">
            <div className="row g-0">
              <div className="d-flex align-items-center justify-content-center">
                <div className="card-body p-4 p-lg-5 text-black">

                  <form >

                    <div className='row'>
                      <div className="form-outline mb-3 col-lg-6 col-12 col">
                        <label className="form-label text-dark" htmlFor="form2Example17">Name</label>
                        <input type="text" name='name' id="form2Example17" placeholder='Enter your Event name' className="form-control form-control-md"
                          value={editDatas.name} onChange={handleChange} />
                      </div>

                      <div className="form-outline mb-3 col-lg-6 col-12 col">
                        <label className="form-label text-dark" htmlFor="form2Example47">Type</label>
                        <select className="form-select" name='type' aria-label="Default select example"
                          value={editDatas.type} onChange={handleChange} >
                          <option value="">Select</option>
                          <option value="Party">Party</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Meeting">Meeting</option>
                          <option value="Conference">Conference</option>
                        </select>
                      </div>
                    </div>

                    <div className='row'>
                      <div className="form-outline mb-3 col-lg-6 col-12 col">
                        <label className="form-label text-dark" htmlFor="form2Example10">Address</label>
                        <input type="text" name='adds' id="form2Example10" placeholder='Enter your address' className="form-control form-control-md"
                          value={editDatas.adds} onChange={handleChange} />
                      </div>

                      <div className="form-outline mb-3 col-lg-6 col-12 col">
                        <label className="form-label text-dark" htmlFor="form2Example38">Phone</label>
                        <input type="number" name='phone' id="form2Example38" placeholder='Enter your Phone' className="form-control form-control-md"
                          value={editDatas.phone} onChange={handleChange} />
                      </div>
                    </div>

                    <div className='row'>
                      <div className="form-outline mb-3 col-lg-6 col-12 col">
                        <label className="form-label text-dark" htmlFor="form2Example87">Start Date</label>
                        <input type="date" name='date' id="form2Example87" className="form-control form-control-md"
                          value={editDatas.date} onChange={handleChange} />
                      </div>
                      <div className="form-outline mb-3 col-lg-6 col-12 col">
                        <label className="form-label text-dark" htmlFor="form2Example87"> End Date</label>
                        <input type="date" name='endDate' id="form2Example87" className="form-control form-control-md"
                          value={editDatas.endDate} onChange={handleChange} />
                      </div>
                    </div>
                    
                    <div className='row'>
                    <div className="form-outline mb-3 col-lg-6 col-12 col">
                        <label className="form-label text-dark" htmlFor="form2Example37">$ Price</label>
                        <input type="number" name='price' id="form2Example37" placeholder='Enter your Phone' className="form-control form-control-md"
                          value={editDatas.price} onChange={handleChange} />
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal><table className='table' style={{ backgroundColor: "transparent !important" }}>
        <thead className="thead-light">
          <tr>
            <th>Event Name</th>
            <th>Event Type</th>
            <th>Event Address</th>
            <th>Phone</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {eventList.map((item, id) => (
            <tr key={id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.adds}</td>
              <td>{item.phone}</td>
              <td>{dateformat(item.date)}</td>
              <td>{dateformat(item.endDate)}</td>
              <td>{item.price}</td>
              <td>
                {item.status == 0 ? <span className='text-danger'> Event Deleted</span> :
                  <div className='d-flex gap-2 align-items-center'>
                    <AiFillEdit style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }} onClick={() => handleEditEvent(item._id, item)} />
                    <MdDelete style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }} onClick={() => handleDeleteEvent(item._id)} />
                  </div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table></>
  )
}

const mapStateToProps = (state) => {
  const { eventList } = state.events
  return { eventList }
}

export default connect(mapStateToProps, { getEvents, eventDelete, eventEdit })(Events)