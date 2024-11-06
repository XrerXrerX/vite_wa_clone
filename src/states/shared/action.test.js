/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */


/**
 * Skenario pengujian untuk asyncPopulateUsersAndThreads thunk
 *
 * - asyncPopulateUsersAndThreads thunk
 *   - should dispatch action correctly when data fetching success
 *     - Saat data thread dan user berhasil diambil dari API, thunk ini akan:
 *       - Memanggil `showLoading` untuk menampilkan indikator pemuatan.
 *       - Mendapatkan data thread dari `api.getAllThreads`.
 *       - Mendapatkan data user dari `api.getAllUsers`.
 *       - Memanggil `receiveThreadsActionCreator` dengan data thread yang didapat.
 *       - Memanggil `receiveUsersActionCreator` dengan data user yang didapat.
 *       - Memanggil `hideLoading` untuk menyembunyikan indikator pemuatan.
 *
 *   - should dispatch action and call alert correctly when data fetching failed
 *     - Saat pengambilan data dari API gagal, thunk ini akan:
 *       - Memanggil `showLoading` untuk menampilkan indikator pemuatan.
 *       - Gagal mendapatkan data thread dan user, sehingga akan memicu alert dengan pesan error.
 *       - Memanggil `hideLoading` untuk menyembunyikan indikator pemuatan.
 *       - Memastikan alert ditampilkan dengan pesan error yang sesuai.
 */



import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

import { asyncPopulateUsersAndThreads } from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';


const fakeThread = {
  authUser: 'user-XDt4NA3kiS9Gksz2',
  body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
  category: 'redux',
  createdAt: '2023-05-29T07:55:52.266Z',
  downVotesBy: [],
  id: 'thread-Np47p4jhUXYhrhRn',
  ownerId: 'user-mQhLzINW_w5TxxYf',
  title: 'Bagaimana pengalamanmu belajar Redux?',
  totalComments: 0,
  upVotesBy: []
};

const fakeUser = {
  id: 'user-mQhLzINW_w5TxxYf',
  name: 'Dimas Saputra',
  email: 'dimas@dicoding.com',
  avatar: 'https://ui-avatars.com/api/?name=Dimas%20Saputra&background=random'

};


const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._getAllUsers = api.getAllUsers;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.getAllUsers = api._getAllUsers;

    // delete backup data
    delete api._getAllThreads;
    delete api._getAllUsers;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllThreads = () => Promise.resolve(fakeThread);
    api.getAllUsers = () => Promise.resolve(fakeUser);
    // mock dispatch
    const dispatch = vi.fn();

    //action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThread));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllThreads = () => Promise.reject(fakeThread);
    api.getAllUsers = () => Promise.reject(fakeUser);

    // mock dispatch
    const dispatch = vi.fn();


    // mock alert
    window.alert = vi.fn();



    // action
    await asyncPopulateUsersAndThreads()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message); // Use the error response
  });


});

