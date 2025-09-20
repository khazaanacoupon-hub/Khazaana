import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import adminRoutes from './routes/adminRoutes.js'
import dataRoutes from './routes/dataRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
// Try different ports to avoid conflicts
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5001

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_API_LINK || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// Routes
app.use('/api/admin', adminRoutes)
app.use('/api/data', dataRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    database: 'MongoDB Connected'
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

// Handle all routes by serving the React app (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

// Function to try starting server on different ports if the default is in use
function startServer(port) {
  // Validate port number
  if (port < 0 || port >= 65536) {
    console.error(`Invalid port number: ${port}. Port must be between 0 and 65535.`);
    // Try a default valid port
    port = 5001;
    console.log(`Falling back to default port: ${port}`);
  }
  
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  })

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      // Check if next port is still valid
      if (nextPort < 65536) {
        console.log(`Port ${port} is in use, trying ${nextPort}...`)
        startServer(nextPort)
      } else {
        console.error('No available ports found in valid range (0-65535)')
      }
    } else {
      console.error('Server error:', error)
    }
  })
}

// Start the server
startServer(PORT)