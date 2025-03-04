import express from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.js';

const authenticate = express.Router();

authenticate.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check for Authorization header and Bearer token format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token missing or invalid format'
    });
  }

  // 2. Extract the token
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find the user in the database (after token verification)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      // 5. Select only necessary fields for performance and security
      select: { id: true, email: true, name: true, /* other fields you need */ }
    });

    // 6. Check if the user exists (important: user might have been deleted)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User not found'
      });
    }

    // 7. Store the selected user data in req.user
    req.user = user;

    // 8. Call next() to proceed to the protected route handler
    next();

  } catch (error) {
    // 9. Handle authentication errors
    console.error("Authentication error:", error);

    // 10. Check for specific JWT errors (token expiration)
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    } else if (error instanceof jwt.JsonWebTokenError) { // Check for other JWT errors
      return res.status(401).json({
          success: false,
          message: 'Invalid token'
      })
  }

    // 11. Generic error message for other authentication errors
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }
});

export default authenticate;