import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { dataAPI } from "../../services/api";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";

// Function to generate time slots from 08:00 to 18:00 with 30 min interval
const generateTimeSlots = () => {
  const slots = [];
  let hour = 8;
  let minute = 0;

  while (hour < 18 || (hour === 18 && minute === 0)) {
    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");
    slots.push(`${hh}:${mm}`);
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { admin, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await dataAPI.getAll();
      setData(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editingId) {
        await dataAPI.update(editingId, formData);
        toast.success("Data updated successfully!");
        setEditingId(null);
      } else {
        await dataAPI.create(formData);
        toast.success("Data added successfully!");
      }
      reset();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setValue("time", item.time);
    setValue("number", item.number);
  };

  const handleDelete = async (_id) => {
    if (!_id) return toast.error("Invalid ID");
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await dataAPI.delete(_id);
        toast.success("Data deleted successfully!");
        fetchData();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete data");
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background-alt)",
        padding: "1rem",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "var(--background)",
          padding: "1rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
          borderRadius: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Admin Dashboard
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ color: "var(--text-secondary)" }}>
              {/* Welcome, {admin?.name} */}
              Welcome, Admin
            </span>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="grid grid-cols-2" style={{ gap: "2rem" }}>
          {/* Add/Edit Form */}
          <motion.div
            className="card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
              }}
            >
              {editingId ? "Edit Data" : "Add New Data"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Time Dropdown */}
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-gray-700 font-medium">
                  Time <span className="text-red-500">*</span>
                </label>
                {/* <select
                  {...register("time", { required: "Please select a time" })}
                  className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                  defaultValue=""
                > */}
                <select
                  {...register("time", { required: "Please select a time" })}
                  className={`focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: `1px solid var(--border-color)`,
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    backgroundColor: "var(--background)",
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Select Time --
                  </option>
                  {timeSlots.map((time) => {
                    const [h, m] = time.split(":");
                    const hour = parseInt(h, 10);
                    const ampm = hour >= 12 ? "PM" : "AM";
                    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
                    return (
                      <option key={time} value={time}>
                        {formattedHour}:{m} {ampm}
                      </option>
                    );
                  })}
                </select>
                {errors.time && (
                  <p className="text-red-500 text-sm">{errors.time.message}</p>
                )}
              </div>

              {/* Number Input */}
              <FormInput
                label="Number"
                name="number"
                type="number"
                register={register}
                errors={errors}
                placeholder="Enter a number"
                required
              />

              <div style={{ display: "flex", gap: "1rem" }}>
                {editingId && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={cancelEdit}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit" loading={loading} style={{ flex: 1 }}>
                  {editingId ? "Update" : "Add"} Data
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Data List */}
          <motion.div
            className="card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
              }}
            >
              Data Records ({data.length})
            </h2>

            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {data.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    padding: "2rem",
                  }}
                >
                  No data records yet. Add your first record!
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {data.map((item, index) => (
                    <motion.div
                      key={item.id}
                      style={{
                        padding: "1rem",
                        border: "1px solid var(--border-color)",
                        borderRadius: "0.5rem",
                        backgroundColor:
                          editingId === item.id
                            ? "#fef3c7"
                            : "var(--background)",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontWeight: "500",
                              marginBottom: "0.25rem",
                              color: "black",
                            }}
                          >
                            Time: {item.time}
                          </p>
                          <p style={{ color: "var(--text-secondary)" }}>
                            Number: {item.number}
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            onClick={() => handleEdit(item)}
                            style={{
                              padding: "0.5rem",
                              border: "none",
                              borderRadius: "0.25rem",
                              backgroundColor: "var(--primary-color)",
                              color: "white",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            style={{
                              padding: "0.5rem",
                              border: "none",
                              borderRadius: "0.25rem",
                              backgroundColor: "var(--error-color)",
                              color: "white",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
