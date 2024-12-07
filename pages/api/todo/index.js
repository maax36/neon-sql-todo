import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET': {
        const rows = await sql`SELECT * FROM todo`;
        return res.status(200).json(rows);
      }
      case 'POST': {
        const { text } = req.body;
        if (!text) {
          return res.status(400).json({ error: 'text is required' });
        }
        const result = await sql`INSERT INTO todo (text) VALUES (${text})`;
        return res.status(201).json(result[0]);
      }
      
      default: {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
