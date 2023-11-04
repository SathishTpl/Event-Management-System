import React from 'react';
import { FaUserCircle, FaUserCog } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <section className="vh-100 app-container">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100 gap-4">
                    <div className="card" style={{ width: '10rem', height: '10rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Admin</h5>
                            <NavLink to='/admin-event-management'>
                                <FaUserCog style={{ fontSize: "100px" }} />
                            </NavLink>
                        </div>
                    </div>
                    <div className="card" style={{ width: '10rem', height: '10rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Customer</h5>
                            <NavLink to='/login'>
                                <FaUserCircle style={{ fontSize: "100px" }} />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home