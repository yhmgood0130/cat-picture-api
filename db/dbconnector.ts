import { Pool } from 'pg';

export default new Pool ({
  max: 20,
  connectionString: 'postgres://postgres:admin@localhost:5432',
  idleTimeoutMillis: 30000
});
