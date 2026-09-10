import mysql from 'mysql2/promise';

// Railway injects MYSQL_URL when you attach the MySQL plugin. Locally, either
// set MYSQL_URL in server/.env or supply the individual MYSQL* variables.
function buildConfig() {
  if (process.env.MYSQL_URL) {
    return process.env.MYSQL_URL;
  }

  return {
    host: process.env.MYSQLHOST || '127.0.0.1',
    port: Number(process.env.MYSQLPORT || 3306),
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE || 'srisai',
  };
}

const config = buildConfig();

export const pool = mysql.createPool(
  typeof config === 'string'
    ? config
    : { ...config, waitForConnections: true, connectionLimit: 10, queueLimit: 0 }
);

// Creates the table on boot if it isn't there yet, so a fresh Railway database
// works without a manual migration step.
export async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id           INT AUTO_INCREMENT PRIMARY KEY,
      name         VARCHAR(120)  NOT NULL,
      email        VARCHAR(180)  NOT NULL,
      organisation VARCHAR(180)  NULL,
      message      TEXT          NOT NULL,
      ip           VARCHAR(45)   NULL,
      user_agent   VARCHAR(255)  NULL,
      created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}
