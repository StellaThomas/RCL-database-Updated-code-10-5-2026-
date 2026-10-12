import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Avatar,
  TextField,
  CircularProgress
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {

  const navigate = useNavigate();

const [username, setUsername] = useState("");

const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {

  // Customer validation
  if (!username) {
    alert("Please Enter Username");
    return;
  }

  // Password validation
  if (!password) {
    alert("Please Enter Password");
    return;
  }

  try {

    setLoading(true);

   const res = await axios.post(
    "http://localhost:5000/api/login",
    {
        username: username.trim(),
        password: password.trim()
    }
);

   if (res.data.success) {

  localStorage.setItem(
    "customer",
    JSON.stringify(res.data.customer)
  );

  alert("Login Successful");

  navigate("/dashboard");

} else {

      alert(res.data.message);

    }

  } catch (err) {

    console.log("Login Error:", err);

    if (err.response) {

      alert(
        err.response.data.message ||
        "Invalid Username or Password"
      );

    } else {

      alert("Unable to connect to server.");

    }

  } finally {

    setLoading(false);

  }

};

return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
      p: 3,
    }}
  >
    <Paper
      elevation={15}
      sx={{
        width: 450,
        borderRadius: 5,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          background:
            "linear-gradient(90deg,#1976d2,#42a5f5)",
          color: "#fff",
          textAlign: "center",
          py: 5,
        }}
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            margin: "auto",
            bgcolor: "#fff",
            color: "#1976d2",
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 45 }} />
        </Avatar>

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={2}
        >
          Customer Portal
        </Typography>

        <Typography>
          Calibration Management System
        </Typography>
      </Box>

      {/* Body */}

      <Box p={4}>

     <Typography
  fontWeight="bold"
  mb={1}
>
  Username
</Typography>

<TextField
  fullWidth
  label="Username"
  placeholder="Enter Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  sx={{ mb: 3 }}
/>

        <Typography
          fontWeight="bold"
          mb={1}
        >
          Password
        </Typography>

      <TextField
  fullWidth
  label="Password"
  placeholder="Enter Password"
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  autoComplete="off"
  sx={{
    mb: 2,
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? (
            <VisibilityOff />
          ) : (
            <Visibility />
          )}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

      <Button
  fullWidth
  variant="contained"
  sx={{
    mt: 4,
    py: 1.5,
    fontSize: 18,
    borderRadius: 5,
  }}
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? (
    <CircularProgress
      size={24}
      sx={{ color: "#fff" }}
    />
  ) : (
    "LOGIN"
  )}
</Button>

<Typography
  align="center"
  sx={{ mt: 3 }}
>
  Don't have an account?
</Typography>

<Button
  fullWidth
  variant="text"
  sx={{ mt: 1 }}
  onClick={() => navigate("/create-password")}
>
  CREATE ACCOUNT
</Button>

<Typography
  textAlign="center"
  mt={4}
  color="gray"
  fontSize={14}
>
  © 2026 RCL Calibration Management System
</Typography>

      </Box>
    </Paper>
  </Box>
  );
}

export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   InputAdornment,
//   IconButton,
//   Avatar,
//   TextField,
//   CircularProgress,
// } from "@mui/material";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// function Login() {
//   const navigate = useNavigate();

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // =====================================================
//   // LOCAL BACKEND API
//   // =====================================================

//   const API_URL = "http://localhost:5000/api";

//   console.log("Login API URL:", `${API_URL}/login`);

//   // =====================================================
//   // LOGIN
//   // =====================================================

//   const handleLogin = async () => {
//     // ---------------------------------------------------
//     // Username validation
//     // ---------------------------------------------------

//     if (!username.trim()) {
//       alert("Please Enter Username");
//       return;
//     }

//     // ---------------------------------------------------
//     // Password validation
//     // ---------------------------------------------------

//     if (!password) {
//       alert("Please Enter Password");
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log("========== LOGIN ==========");
//       console.log("API:", `${API_URL}/login`);
//       console.log("Username:", username.trim());

//       // -------------------------------------------------
//       // LOGIN API
//       // -------------------------------------------------

//       const res = await axios.post(
//         `${API_URL}/login`,
//         {
//           username: username.trim(),
//           password: password.trim(),
//         },
//         {
//           timeout: 15000,
//         },
//       );

//       console.log("Login Response:", res.data);

//       // -------------------------------------------------
//       // SUCCESS
//       // -------------------------------------------------

//       if (res.data?.success) {
//         // Save customer information
//         localStorage.setItem("customer", JSON.stringify(res.data.customer));

//         console.log("Customer Saved:", res.data.customer);

//         alert("Login Successful");

//         // Navigate to dashboard
//         navigate("/dashboard");
//       } else {
//         // ------------------------------------------------
//         // LOGIN FAILED
//         // ------------------------------------------------

//         alert(res.data?.message || "Invalid Username or Password");
//       }
//     } catch (err) {
//       console.error("========== LOGIN ERROR ==========");
//       console.error(err);

//       // -------------------------------------------------
//       // SERVER RESPONSE ERROR
//       // -------------------------------------------------

//       if (err.response) {
//         console.error("Status:", err.response.status);

//         console.error("Response:", err.response.data);

//         alert(err.response.data?.message || "Invalid Username or Password");
//       }

//       // -------------------------------------------------
//       // NO RESPONSE FROM SERVER
//       // -------------------------------------------------
//       else if (err.request) {
//         console.error("Backend server did not respond.");

//         alert(
//           "Unable to connect to backend server.\n\n" +
//             "Please make sure backend is running on:\n" +
//             "http://localhost:5000",
//         );
//       }

//       // -------------------------------------------------
//       // OTHER ERROR
//       // -------------------------------------------------
//       else {
//         alert(err.message || "Unable to login.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
//         p: 3,
//       }}
//     >
//       <Paper
//         elevation={15}
//         sx={{
//           width: 450,
//           borderRadius: 5,
//           overflow: "hidden",
//           background: "#fff",
//         }}
//       >
//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <Box
//           sx={{
//             background: "linear-gradient(90deg,#1976d2,#42a5f5)",
//             color: "#fff",
//             textAlign: "center",
//             py: 5,
//           }}
//         >
//           <Avatar
//             sx={{
//               width: 90,
//               height: 90,
//               margin: "auto",
//               bgcolor: "#fff",
//               color: "#1976d2",
//             }}
//           >
//             <LockOutlinedIcon sx={{ fontSize: 45 }} />
//           </Avatar>

//           <Typography variant="h4" fontWeight="bold" mt={2}>
//             Customer Portal
//           </Typography>

//           <Typography>Calibration Management System</Typography>
//         </Box>

//         {/* =================================================
//             BODY
//         ================================================= */}

//         <Box p={4}>
//           {/* Username */}

//           <Typography fontWeight="bold" mb={1}>
//             Username
//           </Typography>

//           <TextField
//             fullWidth
//             label="Username"
//             placeholder="Enter Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             autoComplete="username"
//             sx={{ mb: 3 }}
//           />

//           {/* Password */}

//           <Typography fontWeight="bold" mb={1}>
//             Password
//           </Typography>

//           <TextField
//             fullWidth
//             label="Password"
//             placeholder="Enter Password"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//             sx={{
//               mb: 2,
//             }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Login Button */}

//           <Button
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 4,
//               py: 1.5,
//               fontSize: 18,
//               borderRadius: 5,
//             }}
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <CircularProgress
//                 size={24}
//                 sx={{
//                   color: "#fff",
//                 }}
//               />
//             ) : (
//               "LOGIN"
//             )}
//           </Button>

//           {/* Create Account */}

//           <Typography align="center" sx={{ mt: 3 }}>
//             Don't have an account?
//           </Typography>

//           <Button
//             fullWidth
//             variant="text"
//             sx={{ mt: 1 }}
//             onClick={() => navigate("/create-password")}
//           >
//             CREATE ACCOUNT
//           </Button>

//           {/* Footer */}

//           <Typography textAlign="center" mt={4} color="gray" fontSize={14}>
//             © 2026 RCL Calibration Management System
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default Login;









// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   InputAdornment,
//   IconButton,
//   Avatar,
//   TextField,
//   CircularProgress,
// } from "@mui/material";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// function Login() {
//   const navigate = useNavigate();

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // =====================================================
//   // LOCAL BACKEND API
//   // =====================================================

  
// const API_URL = process.env.REACT_APP_API_BASE_URL;

//   console.log("Login API URL:", `${API_URL}/login`);

//   // =====================================================
//   // LOGIN
//   // =====================================================

//   const handleLogin = async () => {
//     // ---------------------------------------------------
//     // Username validation
//     // ---------------------------------------------------

//     if (!username.trim()) {
//       alert("Please Enter Username");
//       return;
//     }

//     // ---------------------------------------------------
//     // Password validation
//     // ---------------------------------------------------

//     if (!password) {
//       alert("Please Enter Password");
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log("========== LOGIN ==========");
//       console.log("API:", `${API_URL}/login`);
//       console.log("Username:", username.trim());

//       // -------------------------------------------------
//       // LOGIN API
//       // -------------------------------------------------

//      const res = await axios.post(
//   `${API_URL}/login`,
//   {
//     username: username.trim(),
//     password: password.trim(),
//   },
//   {
//     timeout: 15000,
//   },
// );

//       console.log("Login Response:", res.data);

//       // -------------------------------------------------
//       // SUCCESS
//       // -------------------------------------------------

//       if (res.data?.success) {
//         // Save customer information
//         localStorage.setItem("customer", JSON.stringify(res.data.customer));

//         console.log("Customer Saved:", res.data.customer);

//         alert("Login Successful");

//         // Navigate to dashboard
//         navigate("/dashboard");
//       } else {
//         // ------------------------------------------------
//         // LOGIN FAILED
//         // ------------------------------------------------

//         alert(res.data?.message || "Invalid Username or Password");
//       }
//     } catch (err) {
//       console.error("========== LOGIN ERROR ==========");
//       console.error(err);

//       // -------------------------------------------------
//       // SERVER RESPONSE ERROR
//       // -------------------------------------------------

//       if (err.response) {
//         console.error("Status:", err.response.status);

//         console.error("Response:", err.response.data);

//         alert(err.response.data?.message || "Invalid Username or Password");
//       }

//       // -------------------------------------------------
//       // NO RESPONSE FROM SERVER
//       // -------------------------------------------------
//       else if (err.request) {
//         console.error("Backend server did not respond.");

//        alert(
//   "Unable to connect to backend server.\n\n" +
//     "Please make sure backend is running on:\n" +
//     "http://82.112.230.61:2000",
// );
//       }

//       // -------------------------------------------------
//       // OTHER ERROR
//       // -------------------------------------------------
//       else {
//         alert(err.message || "Unable to login.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
//         p: 3,
//       }}
//     >
//       <Paper
//         elevation={15}
//         sx={{
//           width: 450,
//           borderRadius: 5,
//           overflow: "hidden",
//           background: "#fff",
//         }}
//       >
//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <Box
//           sx={{
//             background: "linear-gradient(90deg,#1976d2,#42a5f5)",
//             color: "#fff",
//             textAlign: "center",
//             py: 5,
//           }}
//         >
//           <Avatar
//             sx={{
//               width: 90,
//               height: 90,
//               margin: "auto",
//               bgcolor: "#fff",
//               color: "#1976d2",
//             }}
//           >
//             <LockOutlinedIcon sx={{ fontSize: 45 }} />
//           </Avatar>

//           <Typography variant="h4" fontWeight="bold" mt={2}>
//             Customer Portal
//           </Typography>

//           <Typography>Calibration Management System</Typography>
//         </Box>

//         {/* =================================================
//             BODY
//         ================================================= */}

//         <Box p={4}>
//           {/* Username */}

//           <Typography fontWeight="bold" mb={1}>
//             Username
//           </Typography>

//           <TextField
//             fullWidth
//             label="Username"
//             placeholder="Enter Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             autoComplete="username"
//             sx={{ mb: 3 }}
//           />

//           {/* Password */}

//           <Typography fontWeight="bold" mb={1}>
//             Password
//           </Typography>

//           <TextField
//             fullWidth
//             label="Password"
//             placeholder="Enter Password"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//             sx={{
//               mb: 2,
//             }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Login Button */}

//           <Button
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 4,
//               py: 1.5,
//               fontSize: 18,
//               borderRadius: 5,
//             }}
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <CircularProgress
//                 size={24}
//                 sx={{
//                   color: "#fff",
//                 }}
//               />
//             ) : (
//               "LOGIN"
//             )}
//           </Button>

//           {/* Create Account */}

//           <Typography align="center" sx={{ mt: 3 }}>
//             Don't have an account?
//           </Typography>

//           <Button
//             fullWidth
//             variant="text"
//             sx={{ mt: 1 }}
//             onClick={() => navigate("/create-password")}
//           >
//             CREATE ACCOUNT
//           </Button>

//           {/* Footer */}

//           <Typography textAlign="center" mt={4} color="gray" fontSize={14}>
//             © 2026 RCL Calibration Management System
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default Login;









