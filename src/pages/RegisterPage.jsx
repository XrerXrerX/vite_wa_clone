
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../component/RegisterInput';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import Swal from 'sweetalert2';



function RegisterPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  const onRegister = async ({ name, email, password }) => {
    const result = await dispatch(asyncRegisterUser({ email, name, password }));
    if (result === 'fail registration') {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'register fail ! .',
      });
      return 'fail registration';
    } else {
      navigate('/');
      Swal.fire({
        icon: 'success',
        title: 'please Login',
        text: 'register success ! .',
      });
    }

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
        <h2 className='title-group-form'>Register Account</h2>
        <RegisterInput register={onRegister} />
        <p className='form-group-text-bottom'>
          already have an account?
          {' '}
          <Link className="form-group-text-bottom-link" to="/login">Login</Link>
        </p>
      </div>



    </div>
  );
}




export default RegisterPage;