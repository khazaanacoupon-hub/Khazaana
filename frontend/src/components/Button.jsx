import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <motion.button
      type={type}
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <div className="spinner" />
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button