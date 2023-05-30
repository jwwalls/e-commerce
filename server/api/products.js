const express = require('express');
const client = require('../db/client');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/',  async (req, res, next) => {
  const { name, shoeFeatures, materialQuality, sizesAccessories, price, category, imagePath } = req.body;

  try {
    const query = `
      INSERT INTO products (name, shoeFeatures, materialQuality, sizesAccessories, price, category, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;
    const values = [name, shoeFeatures, materialQuality, sizesAccessories, price, category, imagePath];
    const result = await client.query(query, values);
    const productId = result.rows[0].id;

    res.status(201).json({ productId });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const query = `
      SELECT *
      FROM products;
    `;
    const result = await client.query(query);
    const products = result.rows;

    res.json({ products });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {

    const query = `
      SELECT *
      FROM products
      WHERE id = $1;
    `;
    const values = [id];
    const result = await client.query(query, values);
    const product = result.rows[0];
 
    res.json({ product });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', upload.single('image'), async (req, res, next) => {
  const { id } = req.params;
  const { name, shoeFeatures, materialQuality, sizesAccessories, price, category, imagePath } = req.body;

  try {

    const query = `
      UPDATE products
      SET name = $1, shoeFeatures = $2, materialQuality = $3, sizesAccessories = $4, price = $5, category = $6, image_url = $7
      WHERE id = $8;
    `;
    const values = [name, shoeFeatures, materialQuality, sizesAccessories, price, category, imagePath, id];
    await client.query(query, values);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
  

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM products
      WHERE id = $1;
    `;
    const values = [id];
    await client.query(query, values);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
