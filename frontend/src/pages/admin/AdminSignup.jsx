import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { adminAuth } from '../../services/api'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'

const AdminSignup = () => {
  const [step, setStep] = useState(1) // 1: signup, 2: OTP verification
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSignupSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await adminAuth.signup(data)
      if (response.data.success) {
        setEmail(data.email)
        setStep(2)
        toast.success('OTP sent to your email!')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const onOTPSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await adminAuth.verifyOTP({
        email,
        otp: data.otp
      })
      if (response.data.success) {
        toast.success('Account created successfully!')
        navigate('/admin/login')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <motion.div 
        className="card"
        style={{ width: '100%', maxWidth: '400px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Admin Signup
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {step === 1 ? 'Create your admin account' : 'Enter the OTP sent to your email'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit(onSignupSubmit)}>
            <FormInput
              label="Full Name"
              name="name"
              register={register}
              errors={errors}
              placeholder="Enter your full name"
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              register={register}
              errors={errors}
              placeholder="Enter your email"
              required
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
              placeholder="Enter your password"
              required
            />
            
            <Button 
              type="submit" 
              loading={loading}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              Send OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onOTPSubmit)}>
            <FormInput
              label="OTP Code"
              name="otp"
              register={register}
              errors={errors}
              placeholder="Enter 6-digit OTP"
              required
            />
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button 
                type="button"
                variant="secondary"
                onClick={() => setStep(1)}
                style={{ flex: 1 }}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                loading={loading}
                style={{ flex: 1 }}
              >
                Verify OTP
              </Button>
            </div>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <Link 
              to="/admin/login" 
              style={{ color: 'var(--primary-color)', textDecoration: 'none' }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminSignup