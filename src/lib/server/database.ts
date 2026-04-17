import { DATABASE_URL } from '$env/static/private'
import pg from 'pg'

export const pool = new pg.Pool({
	// Если Vercel Postgres/Neon через SSL:
	ssl: true,
	connectionString: DATABASE_URL
})
