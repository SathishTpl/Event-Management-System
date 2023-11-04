import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { userLogin } from '../../Actions/customerActions'
import '../../Assets/style.css';

const Login = ({ user }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (email == "" && password == "") {
      return
    }
    else {
      dispatch(userLogin({email, password},navigate))
        // navigate('/customer-event-management')
    }
  }

  return (
    <section className="vh-100 app-container">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-7">
            <div className="card shadow-2-strong container_card">
              <div className="row g-0">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form onSubmit={onSubmit}>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">E<span className='fw-normal' style={{ color: "GrayText" }}>vent </span>
                          M<span className='fw-normal' style={{ color: "GrayText" }}>anagement</span> S<span className='fw-normal' style={{ color: "GrayText" }}>ystem</span></span>
                      </div>

                      <h4 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign In into your account</h4>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">Email address</label>
                        <input type="email" id="form2Example17" placeholder='Enter your email' className="form-control form-control-md"
                          value={email} onChange={e => setEmail(e.target.value)} />
                        {!email && submitted && <span className='text-danger'>*Required</span>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">Password</label>
                        <input type="password" id="form2Example27" placeholder='Enter your password' className="form-control form-control-md"
                          value={password} onChange={e => setPassword(e.target.value)} />
                        {!password && submitted && <span className='text-danger'>*Required</span>}
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-primary btn-md btn-block" type="submit">Sign In</button>
                      </div>
                     
                      <p className="mb-2 pb-lg-1">Don't have an account? <NavLink to="/register">
                        Sign up
                      </NavLink></p>

                    </form>

                  </div>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps,{userLogin})(Login)