// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { dataAPI } from "../../services/api";
// import logo from "./../../assests/logo.png";

// const UserPanel = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState("");

//   useEffect(() => {
//     // Set default date to today's date (YYYY-MM-DD)
//     const today = new Date().toISOString().split("T")[0];
//     setSelectedDate(today);

//     fetchData(today);
//   }, []);

//   // Fetch data from API
//   const fetchData = async (defaultDate = "") => {
//     try {
//       const response = await dataAPI.getAll();
//       const records = response.data.data || [];
//       setData(records);

//       // Filter today's data by default if date provided
//       if (defaultDate) {
//         const filtered = records.filter((item) => {
//           const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
//           return itemDate === defaultDate;
//         });
//         setFilteredData(filtered);
//       } else {
//         setFilteredData(records);
//       }
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle date change and filter data
//   const handleDateChange = (e) => {
//     const selected = e.target.value;
//     setSelectedDate(selected);

//     if (!selected) {
//       // If date is cleared, reset to today's date data
//       const today = new Date().toISOString().split("T")[0];
//       setSelectedDate(today);
//       const filtered = data.filter((item) => {
//         const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
//         return itemDate === today;
//       });
//       setFilteredData(filtered);
//       return;
//     }

//     // Filter data by selected date
//     const filtered = data.filter((item) => {
//       const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
//       return itemDate === selected;
//     });

//     setFilteredData(filtered);
//   };

//   return (
//     <div
//       style={{ minHeight: "100vh", backgroundColor: "var(--background-alt)" }}
//     >
//       {/* Header */}
//       <header
//         style={{
//           backgroundColor: "var(--background)",
//           padding: "1rem 0",
//           boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//           marginBottom: "2rem",
//         }}
//       >
//         <div
//           className="container"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           {/* <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>KHAZAANA</h1> */}
//           <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//             <img
//               src={logo}
//               alt="Logo"
//               style={{ width: "80px", height: "80px", objectFit: "contain" }}
//             />
//             <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>KHAZAANA</h1>
//           </div>
//           <Link
//             to="/admin/login"
//             className="btn btn-primary"
//             style={{ textDecoration: "none" }}
//           >
//             Admin Login
//           </Link>
//         </div>
//       </header>

//       <div className="container">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="page-header" style={{ marginBottom: "1.5rem" }}>
//             <h1 className="page-title">|| Lucky Numbers ||</h1>
//           </div>

//           {/* Date Filter */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-start",
//               alignItems: "center",
//               gap: "1rem",
//               marginBottom: "1.5rem",
//             }}
//           >
//             <label
//               style={{
//                 fontWeight: "600",
//                 fontSize: "1rem",
//                 color: "var(--text-primary)",
//               }}
//             >
//               Select Date:
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={handleDateChange}
//               className="border px-3 py-2 rounded-lg shadow-sm"
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "0.5rem",
//                 borderRadius: "0.5rem",
//                 outline: "none",
//               }}
//             />
//           </div>

//           {loading ? (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "200px",
//               }}
//             >
//               <div
//                 className="spinner"
//                 style={{ width: "40px", height: "40px" }}
//               ></div>
//             </div>
//           ) : filteredData.length === 0 ? (
//             <motion.div
//               className="card"
//               style={{ textAlign: "center", padding: "3rem" }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <h3
//                 style={{
//                   fontSize: "1.25rem",
//                   marginBottom: "1rem",
//                   color: "var(--text-secondary)",
//                 }}
//               >
//                 No Data Available
//               </h3>
//               <p style={{ color: "var(--text-secondary)" }}>
//                 No records found for this date. Try selecting another date.
//               </p>
//             </motion.div>
//           ) : (
//             <div className="grid grid-cols-1" style={{ gap: "1rem" }}>
//               {filteredData.map((item, index) => (
//                 <motion.div
//                   key={item.id}
//                   className="card"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     color: "white",
//                     border: "none",
//                   }}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     <div>
//                       <h3
//                         style={{
//                           fontSize: "1.125rem",
//                           fontWeight: "600",
//                           marginBottom: "0.5rem",
//                         }}
//                       >
//                         Record #{index + 1}
//                       </h3>
//                       <div style={{ display: "flex", gap: "2rem" }}>
//                         <div>
//                           <p style={{ fontSize: "0.875rem", opacity: 0.9 }}>
//                             Time
//                           </p>
//                           <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>
//                             {item.time}
//                           </p>
//                         </div>
//                         <div>
//                           <p style={{ fontSize: "0.875rem", opacity: 0.9 }}>
//                             Number
//                           </p>
//                           <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>
//                             {item.number}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                     <div style={{ fontSize: "2rem", opacity: 0.3 }}>📊</div>
//                   </div>
//                   <div
//                     style={{
//                       marginTop: "1rem",
//                       fontSize: "0.75rem",
//                       opacity: 0.7,
//                     }}
//                   >
//                     Added: {new Date(item.createdAt).toLocaleDateString()}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default UserPanel;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { dataAPI } from "../../services/api";
import logo from "./../../assests/logo.png";
import "./UserPanel.css"; // We'll put responsive CSS here

const UserPanel = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    fetchData(today);
  }, []);

  const fetchData = async (defaultDate = "") => {
    try {
      const response = await dataAPI.getAll();
      const records = response.data.data || [];
      setData(records);

      const filtered = defaultDate
        ? records.filter(
            (item) =>
              new Date(item.createdAt).toISOString().split("T")[0] ===
              defaultDate
          )
        : records;

      setFilteredData(filtered);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    if (!selected) {
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(today);
      setFilteredData(
        data.filter(
          (item) =>
            new Date(item.createdAt).toISOString().split("T")[0] === today
        )
      );
      return;
    }
    setSelectedDate(selected);
    setFilteredData(
      data.filter(
        (item) =>
          new Date(item.createdAt).toISOString().split("T")[0] === selected
      )
    );
  };

  return (
    <div className="user-panel">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-title">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="title">KHAZAANA</h1>
          </div>
          <Link to="/admin/login" className="">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
      </header>

      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="page-header">
            <h1 className="page-title">|| Lucky Number ||</h1>
          </div>

          {/* Date Filter */}
          <div className="date-filter">
            <label>Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="date-input"
            />
          </div>

          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : filteredData.length === 0 ? (
            <motion.div
              className="no-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No Data Available</h3>
              <p>No records found for this date. Try selecting another date.</p>
            </motion.div>
          ) : (
            <div className="cards-container">
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="card-top">
                    <div>
                      <h3>Record #{index + 1}</h3>
                      <div className="card-details">
                        <div>
                          <p>Time</p>
                          <p>{item.time}</p>
                        </div>
                        <div>
                          <p>Number</p>
                          <p>{item.number}</p>
                        </div>
                      </div>
                    </div>
                    <div className="chart-icon">📊</div>
                  </div>
                  <div className="card-footer">
                    Added: {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserPanel;
