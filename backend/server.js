// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./config/db");
// const dataRoutes = require("./routes/dataRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// // ==========================================
// // CORS
// // ==========================================

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ==========================================
// // JSON BODY PARSER
// // ==========================================

// app.use(express.json());

// // ==========================================
// // URL ENCODED DATA
// // ==========================================

// app.use(express.urlencoded({ extended: true }));

// // ==========================================
// // SERVE PDF / CERTIFICATE FILES
// // ==========================================

// app.use(
//   "/certificates",
//   express.static(
//     path.join(__dirname, "certificates")
//   )
// );

// // ==========================================
// // ROOT ROUTE
// // ==========================================

// app.get("/", (req, res) => {
//   res.status(200).send("MDB Backend Running...");
// });

// // ==========================================
// // API ROUTES
// // ==========================================

// app.use("/api", authRoutes);
// app.use("/api", dataRoutes);

// // ==========================================
// // 404 API HANDLER
// // ==========================================

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });

// // ==========================================
// // ERROR HANDLER
// // ==========================================

// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err);

//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//   });
// });

// // ==========================================
// // MONGODB CONNECTION
// // ==========================================

// connectDB()
//   .then(() => {
//     console.log("✅ Database Ready");
//   })
//   .catch((err) => {
//     console.error(
//       "❌ Database Connection Error:",
//       err
//     );
//   });

// // ==========================================
// // SERVER PORT
// // ==========================================

// const PORT = process.env.PORT || 2000;

// // ==========================================
// // START SERVER
// // ==========================================

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(
//     `✅ Server Running On Port ${PORT}`
//   );
//   console.log(
//     `🌐 Local: http://localhost:${PORT}`
//   );
//   console.log(
//     `🌐 API: http://82.112.230.61:${PORT}/api`
//   );
// });








require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const dataRoutes = require("./routes/dataRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ==========================================
// JSON BODY PARSER
// ==========================================

app.use(express.json());

// ==========================================
// URL ENCODED DATA
// ==========================================

app.use(express.urlencoded({ extended: true }));

// ==========================================
// SERVE PDF / CERTIFICATE FILES
// ==========================================

app.use(
  "/certificates",
  express.static(
    path.join(__dirname, "certificates")
  )
);

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).send("MDB Backend Running...");
});

// ==========================================
// API ROUTES
// ==========================================

app.use("/api", authRoutes);
app.use("/api", dataRoutes);

// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ==========================================
// MONGODB CONNECTION
// ==========================================

connectDB()
  .then(() => {
    console.log("✅ Database Ready");
  })
  .catch((err) => {
    console.error(
      "❌ Database Connection Error:",
      err
    );
  });

// ==========================================
// SERVER PORT
// ==========================================

const PORT = 5000;

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, "0.0.0.0", () => {
  console.log("====================================");
  console.log("✅ MDB Backend Server Started");
  console.log(`🌐 Local Server: http://localhost:${PORT}`);
  console.log(`🌐 Local API: http://localhost:${PORT}/api`);
  console.log("====================================");
});










// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./config/db");
// const dataRoutes = require("./routes/dataRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// // ==========================================
// // ENVIRONMENT CONFIGURATION
// // ==========================================

// const PORT = process.env.PORT || 2000;

// const DATA_PATH =
//   process.env.DATA_PATH ||
//   path.join(__dirname, "Data");

// // ==========================================
// // CORS
// // ==========================================

// app.use(
//   cors({
//     origin: "*",
//     methods: [
//       "GET",
//       "POST",
//       "PUT",
//       "DELETE",
//       "PATCH",
//       "OPTIONS",
//     ],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//     ],
//   })
// );

// // ==========================================
// // JSON BODY PARSER
// // ==========================================

// app.use(express.json());

// // ==========================================
// // URL ENCODED DATA
// // ==========================================

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

// // ==========================================
// // SERVE PDF / CERTIFICATE FILES
// // ==========================================
// //
// // If certificates are inside:
// // /var/www/RCl/Data
// //
// // then:
// // http://82.112.230.61:2000/certificates/file.pdf
// // will serve the PDF.
// //




// console.log("PDF DATA PATH:", DATA_PATH);
// console.log(
//   "PDF FOLDER EXISTS:",
//   require("fs").existsSync(DATA_PATH)
// );



// app.use(
//   "/certificates",
//   express.static(DATA_PATH)
// );

// // ==========================================
// // ROOT ROUTE
// // ==========================================

// app.get("/", (req, res) => {
//   res.status(200).send(
//     "MDB Backend Running..."
//   );
// });

// // ==========================================
// // API ROUTES
// // ==========================================

// app.use("/api", authRoutes);
// app.use("/api", dataRoutes);

// // ==========================================
// // 404 HANDLER
// // ==========================================

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });

// // ==========================================
// // ERROR HANDLER
// // ==========================================

// app.use((err, req, res, next) => {
//   console.error(
//     "❌ Server Error:",
//     err
//   );

//   res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//   });
// });

// // ==========================================
// // MONGODB CONNECTION
// // ==========================================

// connectDB()
//   .then(() => {
//     console.log(
//       "✅ Database Ready"
//     );
//   })
//   .catch((err) => {
//     console.error(
//       "❌ Database Connection Error:",
//       err
//     );
//   });

// // ==========================================
// // SERVER START
// // ==========================================

// app.listen(
//   PORT,
//   "0.0.0.0",
//   () => {
//     console.log(
//       "===================================="
//     );

//     console.log(
//       "✅ MDB Backend Server Started"
//     );

//     console.log(
//       `🌐 Server: http://82.112.230.61:${PORT}`
//     );

//     console.log(
//       `🌐 API: http://82.112.230.61:${PORT}/api`
//     );

//     console.log(
//       `📁 DATA PATH: ${DATA_PATH}`
//     );

//     console.log(
//       "===================================="
//     );
//   }
// );