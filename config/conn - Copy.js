const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "admin123",
    host: "localhost",
    port: 5432,
    database: "dbtest",
});

// Connection
pool.connect((err) => {
    if (err) {
        console.error("Connection error", err.stack);
    } else {
        console.log("DB Connected Successfully..");
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
