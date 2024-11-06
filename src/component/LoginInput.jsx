import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="text"
          id="email" // Menambahkan id di sini
          value={email}
          onChange={onEmailChange}
          placeholder="Email address" // Placeholder untuk input email
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password" // Menambahkan id di sini
          value={password}
          onChange={onPasswordChange}
          placeholder="Password" // Placeholder untuk input password
        />
      </div>
      <button type="button" className="btn-submit" onClick={() => login({ email, password })}>
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
