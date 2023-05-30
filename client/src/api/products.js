const BASE_URL = "http://localhost:8080/api/products";

// Create a new product
export async function createProduct(name, shoeFeatures, materialQuality, sizesAccessories, price, category, imagePath) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        shoeFeatures,
        materialQuality,
        sizesAccessories,
        price,
        category,
        imagePath,
      }),
    });

    const data = await response.json();
    return data.productId;
  } catch (error) {
    console.error(error.message || "Failed to create product");
  }
}


// Get all products
export async function getProducts() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error(error.message || "Failed to retrieve products");
  }
}

// Get a product by ID
export async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error(error.message || "Product not found");
  }
}

// Update a product
export async function updateProduct(id, name, shoeFeatures, materialQuality, sizesAccessories, price, category, imagePath) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        shoeFeatures,
        materialQuality,
        sizesAccessories,
        price,
        category,
        imagePath,
      }),
    });

    return response.status === 204;
  } catch (error) {
    console.error(error.message || "Failed to update product");
  }
}

// Delete a product
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    return response.status === 204;
  } catch (error) {
    console.error(error.message || "Failed to delete product");
  }
}
