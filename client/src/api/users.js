const axios = require('axios');

const BASE_URL = 'localhost:8080/api/users';

// Create a new user
async function createUser(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data.message || 'Failed to create user');
  }
}

// User login
async function loginUser(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error.response.data.message || 'Invalid username or password');
  }
}

// Get a user by ID
async function getUserById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message || 'User not found');
  }
}

// Get a user by username
async function getUserByUsername(username) {
  try {
    const response = await axios.get(`${BASE_URL}/username/${username}`);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message || 'User not found');
  }
}

module.exports = {
  createUser,
  loginUser,
  getUserById,
  getUserByUsername,
};
