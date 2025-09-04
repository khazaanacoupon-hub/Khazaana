// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import connectDB from './config/database.js'
// import adminRoutes from './routes/adminRoutes.js'
// import dataRoutes from './routes/dataRoutes.js'

// dotenv.config()

// const app = express()
// const PORT = process.env.PORT || 5000

// // Connect to MongoDB
// connectDB()

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_API_LINK || 'http://localhost:3000',
//   credentials: true
// }))
// app.use(express.json({ limit: '10mb' }))
// app.use(express.urlencoded({ extended: true }))

// // Routes
// app.use('/api/admin', adminRoutes)
// app.use('/api/data', dataRoutes)

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     message: 'Server is running!', 
//     timestamp: new Date().toISOString(),
//     database: 'MongoDB Connected'
//   })
// })

// // Global error handler
// app.use((error, req, res, next) => {
//   console.error('Global error handler:', error)
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!'
//   })
// })

// // Handle 404
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   })
// })

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`)
//   console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
// })


import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import adminRoutes from './routes/adminRoutes.js'
import dataRoutes from './routes/dataRoutes.js'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: "https://khazaana-fro.onrender.com/", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/admin', adminRoutes)
app.use('/api/data', dataRoutes)

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Khazaana API 🚀',
    availableRoutes: [
      '/api/health',
      '/api/admin',
      '/api/data'
    ]
  })
})

// Health check (actually verifies MongoDB connection)
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    database: mongoStatus
  })
})

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  })
})

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
})
