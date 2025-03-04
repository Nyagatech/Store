import { prisma } from '../../utils/prisma.js';

/**
 * Retrieves all products from the database.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function for error handling.
 * @returns {Promise<void>}
 */
const getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();

    // Check if any products were found
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found'
      });
    }

    // Send the products as a response
    return res.send(products); // or res.json(products) for JSON response

  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error); 

    // Log the error for debugging purposes (optional but recommended)
    console.error(error);
  }
};

/**
 * Retrieves a single product by ID.
 *
 * @param {object} req - Express request object (contains the product ID in req.params.id).
 * @param {object} res - Express response object.
 * @returns {void}
 */
const getProductById = (req, res) => {
  // Send a response with the product ID (replace with actual logic later)
  res.send(`This is product with id ${req.params.id}`); // Placeholder logic
};

// Export the route handlers
export default {
  getProducts,
  getProductById
};