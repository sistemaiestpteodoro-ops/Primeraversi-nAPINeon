import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { nombre, edad } = req.body;

    if (!nombre || !edad) {
      return res.status(400).json({ error: "Faltan parámetros" });
    }

    await pool.query(
      "INSERT INTO usuarios (nombre, edad) VALUES ($1, $2)",
      [nombre, edad]
    );

    res.status(200).json({ ok: true, message: "Usuario insertado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}