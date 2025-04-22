const express = require('express');
const app = express();
require('dotenv').config();

const reviewRoutes = require('./routes/reviews');

app.use(express.json()); // permite receber JSON no corpo das requisições
app.use('/reviews', reviewRoutes); // define as rotas a partir de /reviews

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Serviço de Avaliações rodando na porta ${PORT}`);
});
