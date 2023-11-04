import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { customerCreate } from '../../Actions/customerActions'
import '../../Assets/style.css'

const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [state, setState] = useState({
    f_Name: '',
    l_Name: '',
    email: '',
    password: '',
    gender: '',
    phone: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    const { f_Name, l_Name, email, password, gender, phone } = state
    setSubmitted(true)
    e.preventDefault()
    if (f_Name != "" && l_Name != "" && email != "" && password != "" && gender != "" && phone != "") {
      console.log("success",state)
      dispatch(customerCreate(state, navigate))
      // navigate('/login')
    }
    else {
      return
    }
  }

  const { f_Name, l_Name, email, password, gender, phone } = state
  return (
    <section className="vh-100 app-container">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-7">
            <div className="card shadow-2-strong container_card">
              <div className="row g-0">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form onSubmit={handleSubmit}>

                      <div className="d-flex align-items-center mb-2 pb-1">
                        <span className="h1 fw-bold mb-0">E<span className='fw-normal' style={{ color: "GrayText" }}>vent </span>
                          M<span className='fw-normal' style={{ color: "GrayText" }}>anagement</span> S<span className='fw-normal' style={{ color: "GrayText" }}>ystem</span></span>
                      </div>

                      <h4 className="fw-normal mb-3 pb-3 " style={{ letterSpacing: "1px" }}>Sign Up into your account</h4>
                      <div className='row'>
                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                          <label className="form-label" htmlFor="form2Example17">First Name</label>
                          <input type="text" name='f_Name' id="form2Example17" placeholder='Enter your First name' className="form-control form-control-md"
                            value={f_Name} onChange={handleChange} />
                          {!f_Name && submitted && <span className='text-danger'>*Required</span>}
                        </div>

                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                          <label className="form-label" htmlFor="form2Example27">Last Name</label>
                          <input type="text" name='l_Name' id="form2Example27" placeholder='Enter your Last name' className="form-control form-control-md"
                            value={l_Name} onChange={handleChange} />
                          {!l_Name && submitted && <span className='text-danger'>*Required</span>}
                        </div>
                      </div>

                      <div className='row'>
                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                          <label className="form-label" htmlFor="form2Example10">Email address</label>
                          <input type="email" name='email' id="form2Example10" placeholder='Enter your Email' className="form-control form-control-md"
                            value={email} onChange={handleChange} />
                          {!email && submitted && <span className='text-danger'>*Required</span>}
                        </div>

                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                          <label className="form-label" htmlFor="form2Example37">Password</label>
                          <input type="password" name='password' id="form2Example37" placeholder='Enter your Password' className="form-control form-control-md"
                            value={password} onChange={handleChange} />
                          {!password && submitted && <span className='text-danger'>*Required</span>}
                        </div>
                      </div>

                      <div className='row'>
                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                          <label className="form-label" htmlFor="form2Example47">Gender</label>
                          <select className="form-select" name='gender' aria-label="Default select example" value={gender} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {!gender && submitted && <span className='text-danger'>*Required</span>}
                        </div>

                        <div className="form-outline mb-3 col-lg-6 col-12 col">
                          <label className="form-label" htmlFor="form2Example87">Phone</label>
                          <input type="number" name='phone' id="form2Example87" min={0} placeholder='Enter your phone' className="form-control form-control-md"
                            value={phone} onChange={handleChange} />
                          {!phone && submitted && <span className='text-danger'>*Required</span>}

                        </div>
                      </div>

                      <div className="pt-1 mb-3">
                        <button className="btn btn-primary btn-md btn-block" type="submit">Signup</button>
                      </div>

                      <p className="mb-3 pb-lg-2">Already have an account? <NavLink to="/login">
                        Sign in
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

export default connect(null, { customerCreate })(Register)