const router = require('express').Router();
const { createUser, getUser, getUserById, getUserByUsername } = require('../db/users');
const jwt = require('jsonwebtoken');
// POST: api/users
router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await createUser(username, password);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    console.log("Trying to get user from DB...");
    const user = await getUser(username, password);
    console.log("User retrieved from DB: ", user);
    if (!user) {
      console.log("User not found or password incorrect");
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log("User found, trying to sign JWT token...");
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    console.log("Token signed: ", token);
    res.json({ user, token });
  } catch (error) {
    console.error("An error occurred: ", error);
    next(error);
  }
});

// GET: api/users/:id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// GET: api/users/username/:username
router.get('/username/:username', async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
