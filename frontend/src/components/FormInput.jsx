import { motion } from 'framer-motion'

const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  register, 
  errors, 
  placeholder,
  required = false 
}) => {
  const error = errors[name]

  return (
    <motion.div 
      className="form-group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span style={{ color: 'var(--error-color)' }}>*</span>}
      </label>
      <input
        id={name}
        type={type}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && (
        <motion.p 
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error.message}
        </motion.p>
      )}
    </motion.div>
  )
}

export default FormInput