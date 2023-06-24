import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { loginFunc } from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
function Index() {
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    const response = await loginFunc({
      phone_number: phone_number,
      password: password
    })
    if (response.status === 200) {
      toast.success("Login Successfully")
      ///token save local storage
      const role = response.data.data.user.role;
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('role', role);
      setTimeout(() => {
        toast.success("Login Successfully")
        if(role == 'serviceProvider'){
          navigate(`/dashboard`)
        }
        navigate(`/`)
      }, 1000);
    } else {
      toast.error("Wrong credentials ")
    }
    // console.log(response.data.status);
  };
  return (
    <div className='signIn'>
      <div className="container">
        <div className="logo">
          <Link to="/"><h6>SAHULATGAAR</h6></Link>
        </div>
        <div className="row align-items-center mt-5">
          <div className="col-md-6">
            <h2>Sign-In to <br /> Sahulatgaar</h2>
            <p>If you don’t have an account Click here to <Link to="/JoinUs">Sign-up</Link>
            </p>
            <img src="/images/signIn.svg" alt="signIn" />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-9 mx-auto">
                <h4>Sign In</h4>
                <input type="text" className='form-control' placeholder='Enter email or phone number' onChange={e => setPhone(e.target.value)} />
                <input type="password" className='form-control' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <div className="text-end">
                  <div className="form-text">
                    Forget Password?
                  </div>
                </div>
                <button onClick={handleLogin
                } className='btn btn-primary'>Login</button>
                <div className="text-center mt-5 social_icons">
                  <div className="form-text mb-5">
                    or continue with
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link to=""><img src="/images/fb.svg" alt="social_icons" /></Link>
                    <Link to=""><img src="/images/apple.svg" alt="social_icons" /></Link>
                    <Link to=""><img src="/images/google.svg" alt="social_icons" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
export default Index
