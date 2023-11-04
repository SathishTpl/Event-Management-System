import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getCustomers } from '../../Actions/customerActions'

const Customers = ({ getCustomers, customerLists}) => {

    useEffect(() => {
        getCustomers()
    },[])

    const dateformat = (date) => moment(date).format("DD/MM/YYYY")

    return (
        <div className="container">
        <table className="table custom-table-style" >
          <thead className="thead-light">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {customerLists.map((item) => (
              <tr key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.gender}</td>
                <td>{dateformat(item.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
const mapStateToProps = ({ users }) => {
    return users
  }

export default connect(mapStateToProps, {getCustomers}) (Customers)