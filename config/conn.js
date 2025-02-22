const { Pool } = require("pg");

const createPool = () => {
  const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
  });

  // Test the connection when the server starts
  pool.connect((err, client, release) => {
    if (err) {
      console.error("Database connection error:", err.stack);
    } else {
      console.log("✅ DB Connected Successfully...");
      release(); // Release the client back to the pool
    }
  });

  return pool;
};

let pool = createPool();

// Function to reconnect on failure
const reconnectDB = () => {
  console.log("🔄 Reconnecting to DB...");
  pool.end(); // Close the existing pool
  pool = createPool(); // Create a new pool
};

pool.on("error", (err) => {
  console.error("❌ Unexpected DB error:", err);
  reconnectDB();
});

module.exports = {
  query: async (text, params) => {
    try {
      return await pool.query(text, params);
    } catch (err) {
      console.error("⚠️ Query Error:", err);
      throw new Error("Database query failed");
    }
  },
};
