import jwt from 'jsonwebtoken'
import { Admin } from '../models/Admin.js'

export const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // Find admin in database
      const admin = await Admin.findById(decoded.adminId)
      if (!admin || !admin.isVerified) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or unverified admin'
        })
      }

      // Add admin to request object
      req.admin = admin
      next()
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      })
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Optional middleware to check if user is admin (for future role-based access)
export const requireAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === 'admin') {
    next()
  } else {
    res.status(403).json({
      success: false,
      message: 'Admin access required'
    })
  }
}