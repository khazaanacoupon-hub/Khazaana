import { Data } from '../models/Data.js'

export const createData = async (req, res) => {
  try {
    const { time, number } = req.body

    // Validation
    if (!time || number === undefined || number === null) {
      return res.status(400).json({
        success: false,
        message: 'Time and number are required'
      })
    }

    // Validate number is actually a number
    if (isNaN(number)) {
      return res.status(400).json({
        success: false,
        message: 'Number must be a valid number'
      })
    }

    // Create data record
    const dataRecord = new Data({
      time,
      number: parseFloat(number),
      createdBy: req.admin._id
    })

    await dataRecord.save()

    // Populate creator info
    await dataRecord.populate('createdBy', 'name email')

    res.status(201).json({
      success: true,
      message: 'Data created successfully',
      data: dataRecord
    })
  } catch (error) {
    console.error('Create data error:', error)
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      })
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const getAllData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    // Get total count for pagination
    const total = await Data.countDocuments()

    // Get data with pagination and populate creator info
    const data = await Data.find()
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.json({
      success: true,
      data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Get all data error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const updateData = async (req, res) => {
  try {
    const { id } = req.params
    const { time, number } = req.body

    // Validation
    if (!time || number === undefined || number === null) {
      return res.status(400).json({
        success: false,
        message: 'Time and number are required'
      })
    }

    if (isNaN(number)) {
      return res.status(400).json({
        success: false,
        message: 'Number must be a valid number'
      })
    }

    // Check if record exists
    const existingRecord = await Data.findById(id)
    if (!existingRecord) {
      return res.status(404).json({
        success: false,
        message: 'Data record not found'
      })
    }

    // Update data record
    const updatedRecord = await Data.findByIdAndUpdate(
      id,
      {
        time,
        number: parseFloat(number),
        updatedBy: req.admin._id
      },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email').populate('updatedBy', 'name email')

    res.json({
      success: true,
      message: 'Data updated successfully',
      data: updatedRecord
    })
  } catch (error) {
    console.error('Update data error:', error)
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      })
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data record ID'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const deleteData = async (req, res) => {
  try {
    const { id } = req.params

    // Check if record exists
    const existingRecord = await Data.findById(id)
    if (!existingRecord) {
      return res.status(404).json({
        success: false,
        message: 'Data record not found'
      })
    }

    // Delete the record
    await Data.findByIdAndDelete(id)

    res.json({
      success: true,
      message: 'Data deleted successfully'
    })
  } catch (error) {
    console.error('Delete data error:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data record ID'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const getDataById = async (req, res) => {
  try {
    const { id } = req.params

    const dataRecord = await Data.findById(id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')

    if (!dataRecord) {
      return res.status(404).json({
        success: false,
        message: 'Data record not found'
      })
    }

    res.json({
      success: true,
      data: dataRecord
    })
  } catch (error) {
    console.error('Get data by ID error:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data record ID'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}