import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { adminAuth } from "../../services/api";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await adminAuth.forgotPassword(data);
      if (response.data.success) {
        toast.success("OTP sent to your email!");
        navigate(`/admin/reset-password?email=${data.email}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <motion.div
        className="card"
        style={{ width: "100%", maxWidth: "400px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "700" }}>
            Forgot Password
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Enter your email to receive OTP
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
            placeholder="Enter your registered email"
            required
          />

          <Button
            type="submit"
            loading={loading}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Send OTP
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
