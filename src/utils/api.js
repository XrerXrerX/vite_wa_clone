const api = (() => {
  const BASE_URL = 'http://13.229.107.100:8000/api';


  async function _fetchWithAuth(url, options = {}) {

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  async function register({ email, name, password }) {

    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'tokenValidation': '5ljrZQkAxtHpEjKfTRKblN7IwFU9sSyO'

      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'Success') {
      throw new Error(message, status);
    }
    const data = responseJson;

    return data;
  }


  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'tokenValidation': '5ljrZQkAxtHpEjKfTRKblN7IwFU9sSyO'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'Success') {
      throw new Error(message);
    }

    const { token } = responseJson;
    return token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/chatrooms`);
    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'Success') {
      throw new Error(message);
    }

    const { user } = responseJson;
    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { users } } = responseJson;

    return users;
  }

  async function getAllRooms() {
    const response = await fetch(`${BASE_URL}/allchatrooms`, {

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
      }
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'Success') {
      throw new Error(message);
    }

    const { user } = responseJson;

    return user;
  }

  async function getChatsRoom(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/messages/${id}`);

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'Success') {
      throw new Error(message);
    }
    const data = responseJson;

    return data;
  }

  async function addRoom({ name, max_members }) {
    const response = await _fetchWithAuth(`${BASE_URL}/chatrooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'tokenValidation': '5ljrZQkAxtHpEjKfTRKblN7IwFU9sSyO',
      },
      body: JSON.stringify({
        name, max_members
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'Success') {
      throw new Error(message);
    }

    const data = responseJson;
    console.log(data.chatroom);
    return data.chatroom;
  }

  async function addChat({ message_text, attachment_url, chatroom_id }) {
    const formData = new FormData();

    // Append the media (image/video) if provided
    if (attachment_url && attachment_url instanceof File) {
      formData.append('attachment_url', attachment_url);  // 'attachment_url' is the key for the file input field
    }

    // Append the other fields (message_text, chatroom_id)
    formData.append('message_text', message_text);
    formData.append('chatroom_id', chatroom_id);

    // Send the FormData with the POST request
    const response = await _fetchWithAuth(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'tokenValidation': '5ljrZQkAxtHpEjKfTRKblN7IwFU9sSyO',
        // Note: Do not set 'Content-Type' header when using FormData
      },
      body: formData,  // Use FormData to send both the file and other data
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'Success') {
      throw new Error(message);
    }

    return responseJson.data;
  }



  async function getAllChats(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/messages/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'Success') {
      throw new Error(message);
    }
    const { data } = responseJson;

    return data;
  }
  async function getalllistuser() {
    const response = await _fetchWithAuth(`${BASE_URL}/listuser`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'Success') {
      throw new Error(message);
    }
    return responseJson.data;
  }
  async function adduserroom(userId, id) {
    const response = await _fetchWithAuth(`${BASE_URL}/listuser/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'tokenValidation': '5ljrZQkAxtHpEjKfTRKblN7IwFU9sSyO',
      },
      body: JSON.stringify({
        members: [userId]
      }),
    });

    const responseJson = await response.json();
    console.log(responseJson);
    const { status, message } = responseJson;
    if (status !== 'Success') {
      throw new Error(message);
    }
    console.log(responseJson);
    return responseJson;
  }
  return {
    putAccessToken,
    getAccessToken,
    register,
    getalllistuser,
    adduserroom,
    login,
    getOwnProfile,
    getAllUsers,
    getAllRooms,
    addRoom,
    getChatsRoom,
    addChat,
    getAllChats,
  };
})();
export default api;
