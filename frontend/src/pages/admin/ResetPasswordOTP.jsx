import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { adminAuth } from "../../services/api";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";

const ResetPasswordOTP = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email"); // get email from query param

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Verify OTP API call
      const response = await adminAuth.verifyForgotPasswordOTP({
        email,
        otp: data.otp,
      });

      if (response.data.success) {
        toast.success("OTP verified! Now set your new password.");
        navigate(`/admin/reset-password-form?email=${email}`); // go to password reset form
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
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
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        <h2>Enter OTP</h2>
        <p>We sent an OTP to your email: {email}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="OTP"
            name="otp"
            type="text"
            register={register}
            errors={errors}
            placeholder="Enter OTP"
            required
          />
          <Button
            type="submit"
            loading={loading}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordOTP;
