const client = require('./client');

const dropTables = async () => {
  try {
    console.log('Starting to drop all tables...');
    await client.query(`
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS carts CASCADE;
    `);
    console.log('Finished dropping all tables successfully!');
  } catch (error) {
    console.error('Error dropping tables');
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log('Starting to create all tables...');
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL     
    );
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      category VARCHAR(255),
      image_url VARCHAR(255)
    );
    CREATE TABLE carts (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      product_id INT REFERENCES products(id),
      quantity INT
    );
    `);
    console.log(
      'Finished creating all tables successfully! Now, to add some data!'
    );
  } catch (error) {
    console.error('Error creating tables');
    throw error;
  }
};


const createInitialUsers = async () => {
  try {
    console.log('Adding initial users to "Users" table...');

    const users = [
      { username: "user1", password: "password1" },
      { username: "user2", password: "password2" },
      // Add more user objects as needed
    ];

    for (let user of users) {
      await client.query(
        `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *;
      `,
        [user.username, user.password]
      );
      // Create a cart for the user
    }

    console.log("Finished adding users and carts!");
  } catch (error) {
    console.error("Error creating initial users and carts:", error);
    throw error;
  }
};

const createInitialProducts = async () => {
  try {
    console.log('Adding initial products to "Products" table...');

    const products = [
      {
        name: "Product 1",
        description: "Product description",
        price: 9.99,
        category: "Category 1",
        image_url: "https://example.com/product1.jpg",
      },
      {
        name: "Product 2",
        description: "Product description",
        price: 19.99,
        category: "Category 2",
        image_url: "https://example.com/product2.jpg",
      },
      // Add more product objects as needed
    ];

    for (let product of products) {
      await client.query(
        `
        INSERT INTO products (name, description, price, category, image_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
        [product.name,product.description, product.price, product.category, product.image_url]
      );
    }

    console.log("Finished adding products!");
  } catch (error) {
    console.error("Error creating initial products:", error);
    throw error;
  }
};
const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();
