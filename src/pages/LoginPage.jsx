
import React from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../component/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';


function LoginPage() {
  const dispatch = useDispatch(); // @TODO: get dispatch function from store



  const onLogin = ({ email, password }) => {
    if (!email) {
      alert('Email address cannot be empty');
      return;
    }
    if (!password) {
      alert('Password cannot be empty');
      return;
    }

    // @TODO: dispatch async action to login
    dispatch(asyncSetAuthUser({ email, password }));

  };

  return (
    <div className="container">
      {/* Left side: 4x4 Image Grid */}
      <div className="image-grid">
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} className={`grid-item  shape-${index + 1}`}>
          </div>
        ))}
      </div>

      {/* Right side: Login form */}
      <div className="login-form">
        <h2 className='title-group-form'>Login to Your Account</h2>
        <LoginInput login={onLogin} />

        <p className='form-group-text-bottom'>
          Don&apos;t have an account?
          {' '}
          <Link className="form-group-text-bottom-link" to="/register">Register</Link>
        </p>
      </div>

    </div>
  );
}




export default LoginPage;