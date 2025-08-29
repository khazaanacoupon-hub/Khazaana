import express from 'express'
import { 
  createData, 
  getAllData, 
  updateData, 
  deleteData, 
  getDataById 
} from '../controllers/dataController.js'
import { authenticateAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public route - anyone can view data (GET only)
router.get('/', getAllData)
router.get('/:id', getDataById)

// Protected routes - only authenticated admins can modify data
router.post('/', authenticateAdmin, createData)
router.put('/:id', authenticateAdmin, updateData)
router.delete('/:id', authenticateAdmin, deleteData)

export default router