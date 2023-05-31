const BASE_URL = 'http://localhost:8080/api/users';

// Create a new user
export async function createUser(username, password) {
  console.log('Creating user', username, password);
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message || 'Failed to create user');
  }
}

// User login
export async function loginUser(username, password) {
  console.log('loggins', username, password);
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error('Invalid username or password');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message || 'Invalid username or password');
  }
}

// Get a user by ID
export async function getUserById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error('User not found');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message || 'User not found');
  }
}

// Get a user by username
export async function getUserByUsername(username) {
  try {
    const response = await fetch(`${BASE_URL}/username/${username}`);

    if (!response.ok) {
      throw new Error('User not found');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message || 'User not found');
  }
}
