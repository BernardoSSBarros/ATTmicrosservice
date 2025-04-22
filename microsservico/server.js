const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET /dishes
app.get('/dishes', (req, res) => {
  const sql = `
    SELECT dishes.id, dishes.nome, dishes.preco, categories.nome AS categoria
    FROM dishes
    JOIN categories ON dishes.categoria_id = categories.id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar pratos' });
    }
    res.json(results);
  });
});

// POST /dishes
app.post('/dishes', (req, res) => {
  const { nome, preco, categoria } = req.body;
  if (!nome || !preco || !categoria) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
  }

  db.query('SELECT id FROM categories WHERE nome = ?', [categoria], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar categoria' });

    const categoriaId = results[0]?.id;
    const inserirPrato = (idCategoria) => {
      db.query('INSERT INTO dishes (nome, preco, categoria_id) VALUES (?, ?, ?)', [nome, preco, idCategoria], (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao inserir prato' });
        res.status(201).json({ id: result.insertId, nome, preco, categoria });
      });
    };

    if (categoriaId) {
      inserirPrato(categoriaId);
    } else {
      db.query('INSERT INTO categories (nome) VALUES (?)', [categoria], (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao inserir categoria' });
        inserirPrato(result.insertId);
      });
    }
  });
});

// PUT /dishes/:id/price
app.put('/dishes/:id/price', (req, res) => {
  const id = req.params.id;
  const { preco } = req.body;

  db.query('UPDATE dishes SET preco = ? WHERE id = ?', [preco, id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar preço' });
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Prato não encontrado' });
    res.json({ mensagem: 'Preço atualizado com sucesso' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
