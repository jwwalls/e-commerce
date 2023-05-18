const express = require('express');
const client = require('../db/client');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded images

// POST: api/products
router.post('/',  async (req, res, next) => {
  const { name,description, price, category, imagePath } = req.body;
//   const { path: imagePath } = req.file; // Path of the uploaded image file

  try {
    // Save the product to the database
    const query = `
      INSERT INTO products (name,description,  price, category, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const values = [name,description, price, category, imagePath];
    const result = await client.query(query, values);
    const productId = result.rows[0].id;

    // Send a response with the product ID
    res.status(201).json({ productId });
  } catch (error) {
    next(error);
  }
});

// GET: api/products
router.get('/', async (req, res, next) => {
  try {
    // Retrieve all products from the database
    const query = `
      SELECT *
      FROM products;
    `;
    const result = await client.query(query);
    const products = result.rows;

    // Send a response with the products
    res.json({ products });
  } catch (error) {
    next(error);
  }
});

// GET: api/products/:id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // Retrieve the product with the given ID from the database
    const query = `
      SELECT *
      FROM products
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(query, values);
    const product = result.rows[0];

    // Send a response with the product
    res.json({ product });
  } catch (error) {
    next(error);
  }
});

// PUT: api/products/:id
router.put('/:id', upload.single('image'), async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, category, imagePath } = req.body;
    // const { path: imagePath } = req.file; // Path of the uploaded image file
  
    try {
      // Update the product in the database
      const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, category = $4, image_url = $5
        WHERE id = $6;
      `;
      const values = [name, description, price, category, imagePath, id];
      await client.query(query, values);
  
      // Send a response indicating successful update
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });
  

// DELETE: api/products/:id
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // Delete the product from the database
    const query = `
      DELETE FROM products
      WHERE id = $1;
    `;
    const values = [id];
    await client.query(query, values);

    // Send a response indicating successful deletion
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
