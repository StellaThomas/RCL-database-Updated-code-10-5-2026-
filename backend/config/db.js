
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "RCLDatabase";

let db = null;

const connectDB = async () => {
  try {

    if (db) {
      return db;
    }

    const client = await MongoClient.connect(url);

    db = client.db(dbName);

    console.log("✅ MongoDB Connected");

    return db;

  } catch (error) {

    console.error("❌ MongoDB Connection Error");
    console.error(error);

    throw error;
  }
};

module.exports = connectDB;









// const { MongoClient } = require("mongodb");

// const url = "mongodb://127.0.0.1:27017";
// const dbName = "RCLDatabase";

// const DATA_PATH = "/var/www/RCl/Data";

// let db = null;
// let client = null;

// const connectDB = async () => {
//   try {
//     if (db) {
//       return db;
//     }

//     client = new MongoClient(url);

//     await client.connect();

//     db = client.db(dbName);

//     console.log("✅ MongoDB Connected");
//     console.log("✅ Database:", dbName);
//     console.log("📁 Data Path:", DATA_PATH);

//     return db;

//   } catch (error) {
//     console.error("❌ MongoDB Connection Error");
//     console.error(error);

//     throw error;
//   }
// };

// module.exports = connectDB;






