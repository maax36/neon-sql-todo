import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const rows = await sql`SELECT * FROM todo WHERE id = ${id}`;
        if (rows.length === 0) {
          return res.status(404).json({ error: `Todo with ID ${id} not found` });
        }
        return res.status(200).json(rows[0]);
      }
      case 'DELETE': {
        const result = await sql`DELETE FROM todo WHERE id = ${id} RETURNING *`;
        if (result.length === 0) {
          return res.status(404).json({ error: `Todo with ID ${id} not found` });
        }
        return res.status(200).json({ message: `Todo with ID ${id} deleted` });
      }
      default: {
        res.setHeader('Allow', ['GET', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
