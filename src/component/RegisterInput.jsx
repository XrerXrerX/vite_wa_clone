import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Name" // Placeholder untuk input name
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email Address" // Placeholder untuk input email
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password" // Placeholder untuk input password
        />
      </div>

      <div className="form-group">
        <button
          type="button"
          className="btn-submit"
          onClick={() => register({ name, email, password })}
        >
          Register
        </button>
      </div>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
