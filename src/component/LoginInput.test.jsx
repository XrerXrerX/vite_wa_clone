/**
- LoginInput component
  - should handle username typing correctly
    - Ketika pengguna mengetik di input username (email), nilai input seharusnya sesuai dengan yang diketik.
  - should handle password typing correctly
    - Ketika pengguna mengetik di input password, nilai input seharusnya sesuai dengan yang diketik.
  - should call login function when login button is clicked
    - Ketika pengguna mengisi input username dan password, lalu menekan tombol login, fungsi login seharusnya dipanggil dengan objek yang berisi nilai username dan password yang dimasukkan.
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import LoginInput from './LoginInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(cleanup); // Membersihkan DOM setelah setiap pengujian

  it('should handle username typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => { }} />);
    const usernameInput = screen.getByPlaceholderText('Email address'); // Menggunakan placeholder

    // Action
    await userEvent.type(usernameInput, 'usernametest');
    // Assert
    expect(usernameInput).toHaveValue('usernametest');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => { }} />);
    const passwordInput = screen.getByPlaceholderText('Password'); // Menggunakan placeholder

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const usernameInput = screen.getByPlaceholderText('Email address'); // Menggunakan placeholder
    await userEvent.type(usernameInput, 'usernametest');
    const passwordInput = screen.getByPlaceholderText('Password'); // Menggunakan placeholder
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'usernametest',
      password: 'passwordtest',
    });
  });
});
