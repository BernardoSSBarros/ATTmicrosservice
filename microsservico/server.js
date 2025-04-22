const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const dadosPath = path.join(__dirname, 'dados.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Função para ler dados
function lerDados() {
  if (!fs.existsSync(dadosPath)) {
    fs.writeFileSync(dadosPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dadosPath);
  return JSON.parse(data);
}

// Função para salvar dados
function salvarDados(dados) {
  fs.writeFileSync(dadosPath, JSON.stringify(dados, null, 2));
}

// GET /dishes - Lista todos os pratos
app.get('/dishes', (req, res) => {
  const pratos = lerDados();
  res.json(pratos);
});

// POST /dishes - Adiciona novo prato
app.post('/dishes', (req, res) => {
  const { nome, preco, categoria } = req.body;
  if (!nome || !preco || !categoria) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
  }

  const pratos = lerDados();
  const novoPrato = {
    id: pratos.length ? pratos[pratos.length - 1].id + 1 : 1,
    nome,
    preco,
    categoria,
  };

  pratos.push(novoPrato);
  salvarDados(pratos);
  res.status(201).json(novoPrato);
});

// PUT /dishes/:id/price - Atualiza o preço de um prato
app.put('/dishes/:id/price', (req, res) => {
  const id = parseInt(req.params.id);
  const { preco } = req.body;

  const pratos = lerDados();
  const index = pratos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Prato não encontrado' });
  }

  pratos[index].preco = preco;
  salvarDados(pratos);
  res.json(pratos[index]);
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
