const axios = require('axios');

exports.getPedido = async (pedido_id) => {
  try {
    const response = await axios.get(`http://servico-pedidos/pedidos/${pedido_id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pedido:', error.message);
    return null;
  }
};
