const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser(username, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id, username;
    `;
    const values = [username, hashedPassword];
    const result = await client.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error('User was not created');
    }
    
    const user = result.rows[0];
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    
    return { user, token };
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
}
async function getUser(username, password) {
  try {
    console.log("Querying DB for user...");
    const query = `
      SELECT *
      FROM users
      WHERE username = $1;
    `;
    const values = [username];
    const result = await client.query(query, values);
    console.log("DB Query Result: ", result.rows);
    if (result.rows.length === 0) {
      console.log("User not found in DB.");
      return null; // User not found
    }
    const user = result.rows[0];
    console.log("Comparing password with hashed password...");
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password comparison result: ", passwordMatch);
    if (!passwordMatch) {
      console.log("Password doesn't match.");
      return null; // Incorrect password
    }
    // Do not return password
    delete user.password;
    return user;
  } catch (error) {
    console.error('Error getting user', error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const query = `
      SELECT *
      FROM users
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      return null; // User not found
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user by ID', error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const query = `
      SELECT *
      FROM users
      WHERE username = $1;
    `;
    const values = [username];
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      return null; // User not found
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user by username', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
