

// const express = require("express");
// const router = express.Router();

// const connectDB = require("../config/db");

// // =====================================================
// // CREATE PASSWORD / CREATE CUSTOMER ACCOUNT
// // =====================================================

// router.post("/create-password", async (req, res) => {
//   try {
//     const { customerId, username, password } = req.body;

//     console.log("\n========================================");
//     console.log("CREATE PASSWORD REQUEST");
//     console.log("========================================");
//     console.log("Raw Customer ID :", customerId);
//     console.log("Customer ID Type:", typeof customerId);
//     console.log("Username        :", username);
//     console.log("Password        :", password ? "******" : "EMPTY");

//     // -------------------------------------------------
//     // Validation
//     // -------------------------------------------------

//     if (!customerId || !username || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer ID, Username and Password are required",
//       });
//     }

//     const cleanCustomerId = String(customerId).trim();
//     const cleanUsername = String(username).trim();
//     const cleanPassword = String(password).trim();

//     console.log("Clean Customer ID :", cleanCustomerId);
//     console.log("Clean Username    :", cleanUsername);

//     // -------------------------------------------------
//     // Validate Customer ID
//     // -------------------------------------------------

//     if (!/^\d+$/.test(cleanCustomerId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer ID must be numeric",
//       });
//     }

//     const customerIdNumber = Number(cleanCustomerId);

//     console.log("Customer ID Number:", customerIdNumber);

//     // -------------------------------------------------
//     // Connect Database
//     // -------------------------------------------------

//     const db = await connectDB();

//     console.log("Database connected successfully");

//     // -------------------------------------------------
//     // Check collection
//     // -------------------------------------------------

//     const customerCollection = db.collection("mCustomer");

//     const customerCount = await customerCollection.countDocuments();

//     console.log("mCustomer Collection Count:", customerCount);

//     // -------------------------------------------------
//     // Find customer
//     // IMPORTANT:
//     // Search both Number and String CustomerID
//     // -------------------------------------------------

//     const customer = await customerCollection.findOne({
//       $or: [
//         {
//           CustomerID: customerIdNumber,
//         },
//         {
//           CustomerID: cleanCustomerId,
//         },
//       ],
//     });

//     console.log("Customer Found:", customer);

//     // -------------------------------------------------
//     // Customer not found
//     // -------------------------------------------------

//     if (!customer) {
//       console.log(
//         `❌ Customer ${cleanCustomerId} NOT FOUND in mCustomer`
//       );

//       // Additional debugging
//       const sampleCustomer = await customerCollection.findOne({
//         CustomerID: customerIdNumber,
//       });

//       console.log(
//         "Number Search Result:",
//         sampleCustomer
//       );

//       const stringCustomer = await customerCollection.findOne({
//         CustomerID: cleanCustomerId,
//       });

//       console.log(
//         "String Search Result:",
//         stringCustomer
//       );

//       return res.status(404).json({
//         success: false,
//         message: "Invalid Customer ID",
//       });
//     }

//     console.log("========================================");
//     console.log("CUSTOMER FOUND");
//     console.log("CustomerID :", customer.CustomerID);
//     console.log("Customer   :", customer.Customer);
//     console.log("Address    :", customer.Address);
//     console.log("City       :", customer.City);
//     console.log("Phone      :", customer.Phone);
//     console.log("Email      :", customer.Email);
//     console.log("========================================");

//     // -------------------------------------------------
//     // Check existing account
//     // -------------------------------------------------

//     const existingUser = await db.collection("users").findOne({
//       CustomerID: customer.CustomerID,
//     });

//     console.log("Existing User:", existingUser);

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Account already created for this Customer",
//       });
//     }

//     // -------------------------------------------------
//     // Check Username
//     // -------------------------------------------------

//     const usernameExists = await db.collection("users").findOne({
//       Username: cleanUsername,
//     });

//     console.log("Username Exists:", usernameExists);

//     if (usernameExists) {
//       return res.status(400).json({
//         success: false,
//         message: "Username already exists",
//       });
//     }

//     // -------------------------------------------------
//     // Create User
//     // -------------------------------------------------

//     const newUser = {
//       CustomerID: customer.CustomerID,
//       Customer: customer.Customer || "",
//       Username: cleanUsername,
//       Password: cleanPassword,
//       CreatedAt: new Date(),
//     };

//     console.log("User To Insert:", {
//       ...newUser,
//       Password: "******",
//     });

//     const result = await db
//       .collection("users")
//       .insertOne(newUser);

//     console.log("Inserted User ID:", result.insertedId);

//     console.log("✅ ACCOUNT CREATED SUCCESSFULLY");

//     return res.status(200).json({
//       success: true,
//       message: "Account Created Successfully",
//     });

//   } catch (error) {
//     console.error("\n❌ CREATE PASSWORD ERROR:");
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   }
// });


// // =====================================================
// // LOGIN
// // =====================================================

// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     console.log("\n========================================");
//     console.log("LOGIN REQUEST");
//     console.log("========================================");
//     console.log("Username:", username);
//     console.log("Password:", password ? "******" : "EMPTY");

//     // -------------------------------------------------
//     // Validation
//     // -------------------------------------------------

//     if (!username || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Username and Password are required",
//       });
//     }

//     const cleanUsername = String(username).trim();
//     const cleanPassword = String(password).trim();

//     const db = await connectDB();

//     // -------------------------------------------------
//     // Find User
//     // -------------------------------------------------

//     const user = await db.collection("users").findOne({
//       Username: cleanUsername,
//       Password: cleanPassword,
//     });

//     console.log("User Found:", user);

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Username or Password",
//       });
//     }

//     // -------------------------------------------------
//     // Find Customer
//     // Support number/string CustomerID
//     // -------------------------------------------------

//     const customer = await db.collection("mCustomer").findOne({
//       $or: [
//         {
//           CustomerID: user.CustomerID,
//         },
//         {
//           CustomerID: String(user.CustomerID),
//         },
//         {
//           CustomerID: Number(user.CustomerID),
//         },
//       ],
//     });

//     console.log("Customer Found:", customer);

//     if (!customer) {
//       return res.status(404).json({
//         success: false,
//         message: "Customer Not Found",
//       });
//     }

//     // -------------------------------------------------
//     // Login Success
//     // -------------------------------------------------

//     return res.status(200).json({
//       success: true,
//       message: "Login Successful",

//       customer: {
//         CustomerID: customer.CustomerID,
//         Customer: customer.Customer,
//         Address: customer.Address,
//         City: customer.City,
//         Phone: customer.Phone,
//         Email: customer.Email,
//         Zone: customer.Zone,
//         GSTNo: customer.GSTNo,
//         CompanyID: customer.CompanyID,
//       },
//     });

//   } catch (error) {
//     console.error("\n❌ LOGIN ERROR:");
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   }
// });


// module.exports = router;





const express = require("express");
const router = express.Router();

const connectDB = require("../config/db");


// ======================================
// CREATE PASSWORD
// ======================================
router.post("/create-password", async (req, res) => {
  try {

    const { customerId, username, password } = req.body;

    console.log("\n========== CREATE PASSWORD ==========");
    console.log("Customer ID :", customerId);
    console.log("Username :", username);
    console.log("Password :", password);

    if (!customerId || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Customer ID, Username and Password are required",
      });
    }

    const db = await connectDB();

    // Find customer using CustomerID
    const customer = await db.collection("mCustomer").findOne(
      {
        CustomerID: Number(customerId), // If CustomerID is string then remove Number()
      },
      {
        projection: {
          _id: 0,
          CustomerID: 1,
          Customer: 1,
          Address: 1,
          City: 1,
          Phone: 1,
          Email: 1,
          Zone: 1,
          GSTNo: 1,
          CompanyID: 1,
        },
      }
    );

    console.log("Customer Found :", customer);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Invalid Customer ID",
      });
    }

    // Check if account already exists
    const existingUser = await db.collection("users").findOne({
      CustomerID: customer.CustomerID,
    });

    console.log("Existing User :", existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account already created for this Customer",
      });
    }

    // Check Username
   const usernameExists = await db.collection("users").findOne({
  Username: username,
});

    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Save User
const result = await db.collection("users").insertOne({
  CustomerID: customer.CustomerID,
  Customer: customer.Customer,
  Username: username,
  Password: password,
  CreatedAt: new Date(),
});

    console.log("Inserted ID :", result.insertedId);

    return res.status(200).json({
      success: true,
      message: "Account Created Successfully",
    });

  } catch (error) {

    console.log("CREATE PASSWORD ERROR :", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});



// ======================================
// LOGIN
// ======================================
router.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Username :", username);
    console.log("Password :", password);

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required",
      });
    }

    const db = await connectDB();

    // Find user using Username + Password
   const user = await db.collection("users").findOne({
  Username: username,
  Password: password,
});

    console.log("User Found :", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    // Get customer using CustomerID
    const customer = await db.collection("mCustomer").findOne({
      CustomerID: user.CustomerID,
    });

    console.log("Customer Found :", customer);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      customer: {
        CustomerID: customer.CustomerID,
        Customer: customer.Customer,
        Address: customer.Address,
        City: customer.City,
        Phone: customer.Phone,
        Email: customer.Email,
        Zone: customer.Zone,
        GSTNo: customer.GSTNo,
        CompanyID: customer.CompanyID,
      },
    });

  } catch (error) {

    console.log("LOGIN ERROR :", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;