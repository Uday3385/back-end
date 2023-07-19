const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    max: 10, // Set the maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Set the time duration in milliseconds that a client in the pool is allowed to remain idle before being closed
});

pool.connect((error) => {
    if (error) {
        console.log('Error connecting to the database');
        console.log(error);
        process.exit(1);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = pool;
