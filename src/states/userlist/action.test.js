/**
 * SKENARIO PENGUJIAN UNTUK ACTION CREATOR
 *
 * 1. **toggleReceiveLeaderboard**:
 *    - Saat fungsi ini dipanggil dengan data leaderboard, action yang dihasilkan
 *      harus memiliki tipe RECEIVE_LEADERBOARD dan payload yang berisi data leaderboard.
 *
 * 2. **asyncReceiveLeaderboard**:
 *    - Ketika asyncReceiveLeaderboard dipanggil dan pemanggilan API berhasil:
 *      - Memastikan showLoading dipanggil untuk memulai loading bar.
 *      - Memastikan api.getAllLeaderboard dipanggil untuk mengambil data leaderboard.
 *      - Memastikan toggleReceiveLeaderboard dipanggil dengan data leaderboard yang diterima.
 *      - Memastikan hideLoading dipanggil untuk mengakhiri loading bar.
 *
 *    - Ketika pemanggilan API gagal:
 *      - Memastikan showLoading dipanggil untuk memulai loading bar.
 *      - Memastikan api.getAllLeaderboard dipanggil.
 *      - Memastikan pesan error ditampilkan menggunakan alert.
 *      - Memastikan hideLoading dipanggil untuk mengakhiri loading bar.
 */
import { describe, it, expect, vi } from 'vitest';
import { asyncReceiveLeaderboard, toggleReceiveLeaderboard, ActionType } from './action';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

vi.mock('../../utils/api');
vi.mock('react-redux-loading-bar');

describe('toggleReceiveLeaderboard action creator', () => {
  it('should create an action to receive leaderboard', () => {
    // Arrange
    const leaderboard = [
      { id: '1', name: 'User 1', score: 100 },
      { id: '2', name: 'User 2', score: 50 },
    ];

    // Action
    const action = toggleReceiveLeaderboard(leaderboard);

    // Assert
    expect(action).toEqual({
      type: ActionType.RECEIVE_LEADERBOARD,
      payload: { leaderboard },
    });
  });
});

describe('asyncReceiveLeaderboard async action', () => {
  it('should dispatch actions in correct order when successful', async () => {
    // Arrange
    const mockLeaderboard = [
      { id: '1', name: 'User 1', score: 100 },
      { id: '2', name: 'User 2', score: 50 },
    ];
    api.getAllLeaderboard.mockResolvedValue(mockLeaderboard);
    const dispatch = vi.fn();

    // Action
    await asyncReceiveLeaderboard()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllLeaderboard).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(toggleReceiveLeaderboard(mockLeaderboard));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch hideLoading when there is an error', async () => {
    // Arrange
    const errorMessage = 'Network Error';
    api.getAllLeaderboard.mockRejectedValue(new Error(errorMessage));
    const dispatch = vi.fn();
    window.alert = vi.fn(); // Change to window.alert

    // Action
    await asyncReceiveLeaderboard()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllLeaderboard).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(errorMessage); // Change to window.alert
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
