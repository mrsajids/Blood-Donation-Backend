const { Pool } = require("pg");

const createPool = () => {
  const pool = new Pool({
    user: "postgres",
    password: "TuUrYtTNiHKkrgTcXLuAMRgxSnmIXndv",
    host: "hopper.proxy.rlwy.net",
    port: 44146,
    database: "railway",
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
