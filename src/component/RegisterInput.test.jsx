/**
Skenario pengujian untuk RegisterInput component
- RegisterInput component :
  - should handle name typing correctly
    - Ketika pengguna mengetik di input name, nilai input name seharusnya sesuai dengan yang diketik.
  - should handle email typing correctly
    - Ketika pengguna mengetik di input email, nilai input email seharusnya sesuai dengan yang diketik.
  - should handle password typing correctly
    - Ketika pengguna mengetik di input password, nilai input password seharusnya sesuai dengan yang diketik.
  - should call register function when register button is clicked
    - Ketika pengguna mengisi input name, email, dan password, lalu menekan tombol register, fungsi register seharusnya dipanggil dengan objek yang berisi nilai name, email, dan password yang dimasukkan.
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import RegisterInput from './RegisterInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(cleanup); // Membersihkan DOM setelah setiap pengujian

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => { }} />);
    const nameInput = screen.getByPlaceholderText('Name'); // Menggunakan placeholder

    // Action
    await userEvent.type(nameInput, 'User Name Test');

    // Assert
    expect(nameInput).toHaveValue('User Name Test');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => { }} />);
    const emailInput = screen.getByPlaceholderText('Email Address'); // Menggunakan placeholder

    // Action
    await userEvent.type(emailInput, 'user@example.com');

    // Assert
    expect(emailInput).toHaveValue('user@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => { }} />);
    const passwordInput = screen.getByPlaceholderText('Password'); // Menggunakan placeholder

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = screen.getByPlaceholderText('Name'); // Menggunakan placeholder
    await userEvent.type(nameInput, 'User Name Test');
    const emailInput = screen.getByPlaceholderText('Email Address'); // Menggunakan placeholder
    await userEvent.type(emailInput, 'user@example.com');
    const passwordInput = screen.getByPlaceholderText('Password'); // Menggunakan placeholder
    await userEvent.type(passwordInput, 'passwordtest');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'User Name Test',
      email: 'user@example.com',
      password: 'passwordtest',
    });
  });
});
