const router = require('express').Router();
const { createUser, getUser, getUserById, getUserByUsername } = require('../db/users');

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

// POST: api/users/login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUser(username, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    res.json({ user, token });
  } catch (error) {
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
