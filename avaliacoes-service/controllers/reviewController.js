const db = require('../models/db');
const pedidosService = require('../services/pedidosService');

exports.createReview = async (req, res) => {
  const { user_id, pedido_id, restaurant_id, nota, comentario } = req.body;

  if (!nota || nota < 1 || nota > 5) {
    return res.status(400).json({ error: 'Nota deve estar entre 1 e 5' });
  }

  // Verifica se o pedido está concluído
  const pedido = await pedidosService.getPedido(pedido_id);
  if (!pedido || pedido.status !== 'concluido') {
    return res.status(403).json({ error: 'Pedido não está concluído' });
  }

  // Verifica se já foi avaliado
  const [exist] = await db.query(
    'SELECT id FROM reviews WHERE user_id = ? AND pedido_id = ?',
    [user_id, pedido_id]
  );
  if (exist.length > 0) {
    return res.status(409).json({ error: 'Pedido já foi avaliado' });
  }

  // Cria a review
  await db.query(
    'INSERT INTO reviews (user_id, pedido_id, restaurant_id, nota, comentario) VALUES (?, ?, ?, ?, ?)',
    [user_id, pedido_id, restaurant_id, nota, comentario]
  );

  res.status(201).json({ message: 'Avaliação registrada com sucesso' });
};

exports.getReviews = async (req, res) => {
  const { restaurant_id } = req.query;

  const [rows] = await db.query(
    'SELECT id, user_id, nota, comentario, criado_em FROM reviews WHERE restaurant_id = ?',
    [restaurant_id]
  );

  res.json(rows);
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  await db.query('DELETE FROM reviews WHERE id = ?', [id]);
  res.status(200).json({ message: 'Avaliação deletada com sucesso' });
};
