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

// ----------------------------
// Endpoints para RESTAURANTES
// ----------------------------

// POST - Criar novo restaurante
app.post('/restaurants', (req, res) => {
  const { nome_restaurante, cep_restaurante } = req.body;

  if (!nome_restaurante || !cep_restaurante) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
  }

  const query = 'INSERT INTO restaurantes (nome_restaurante, cep_restaurante) VALUES (?, ?)';
  db.query(query, [nome_restaurante, cep_restaurante], (err, result) => {
    if (err) {
      console.error('Erro ao inserir restaurante:', err);
      return res.status(500).send('Erro no servidor');
    }
    res.status(201).json({ id_restaurante: result.insertId, nome_restaurante, cep_restaurante });
  });
});

// GET - Listar todos os restaurantes
app.get('/restaurants', (req, res) => {
  db.query('SELECT * FROM restaurantes', (err, results) => {
    if (err) {
      console.error('Erro ao buscar restaurantes:', err);
      return res.status(500).send('Erro no servidor');
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000:${PORT}`);
});
