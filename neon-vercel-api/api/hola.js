export default function handler(req, res) {
  res.status(200).json({ mensaje: 'Hola desde mi API en Vercel' });
}