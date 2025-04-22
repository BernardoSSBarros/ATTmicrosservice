import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:3005/reviews"; // backend local

export default function App() {
  const [restaurantId, setRestaurantId] = useState(1);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [userId] = useState(1); // Simulando usuário logado
  const [pedidoId] = useState(23); // Simulando pedido concluído

  useEffect(() => {
    carregarAvaliacoes();
  }, [restaurantId]);

  const carregarAvaliacoes = async () => {
    const res = await fetch(`${API_URL}?restaurant_id=${restaurantId}`);
    const data = await res.json();
    setAvaliacoes(data);
  };

  const enviarAvaliacao = async () => {
    const novaAvaliacao = {
      user_id: userId,
      pedido_id: pedidoId,
      restaurant_id: restaurantId,
      nota,
      comentario
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaAvaliacao)
    });

    const data = await res.json();
    alert(data.message || data.error);
    carregarAvaliacoes();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Avaliações do Restaurante #{restaurantId}</h1>

        <div className="mb-4">
          <label className="block mb-1">Nota (1 a 5)</label>
          <input
            type="number"
            value={nota}
            onChange={e => setNota(parseInt(e.target.value))}
            min={1}
            max={5}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Comentário</label>
          <textarea
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            className="w-full border rounded p-2"
          ></textarea>
        </div>

        <button
          onClick={enviarAvaliacao}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar Avaliação
        </button>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-3">Avaliações Recebidas</h2>
        <ul>
          {avaliacoes.map((a) => (
            <li key={a.id} className="border-b py-2">
              <p><strong>Nota:</strong> {a.nota}</p>
              <p><strong>Comentário:</strong> {a.comentario}</p>
              <p className="text-sm text-gray-500">{new Date(a.criado_em).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
