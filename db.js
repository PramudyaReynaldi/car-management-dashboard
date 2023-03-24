const { Pool } = require("pg");

// The secret connection string you copied earlier
const connectionString =
   "postgresql://postgres:dwbXFY1d0Y0N4FZUqUDr@containers-us-west-99.railway.app:7872/railway";

const pool = new Pool({
   connectionString,
});

module.exports = pool;
