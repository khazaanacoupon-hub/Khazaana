import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { adminAuth } from "../../services/api";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await adminAuth.reset({
        email,
        newPassword: data.newPassword,
      });

      if (response.data.success) {
        toast.success("Password reset successful! You can now login.");
        navigate("/admin/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset password failed");
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
        <h2>Set New Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="New Password"
            name="newPassword"
            type="password"
            register={register}
            errors={errors}
            placeholder="Enter new password"
            required
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            errors={errors}
            placeholder="Confirm new password"
            required
          />
          {watch("newPassword") !== watch("confirmPassword") &&
            watch("confirmPassword") && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Passwords do not match!
              </p>
            )}
          <Button
            type="submit"
            loading={loading}
            style={{ width: "100%", marginTop: "1rem" }}
            disabled={
              watch("newPassword") !== watch("confirmPassword") ||
              !watch("confirmPassword")
            }
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
