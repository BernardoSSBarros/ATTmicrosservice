const express = require('express');
const cors = require('cors'); // <--- Adicionado
const deliveryService = require('./deliveryService');
const app = express();
const port = 3000;

app.use(cors()); // <--- Adicionado
app.use(express.json());

// Endpoint para iniciar a entrega
app.post('/deliveries', (req, res) => {
    const delivery = deliveryService.createDelivery();
    res.status(201).json(delivery);
});

// Endpoint para atualizar a localização do entregador
app.put('/deliveries/:id/location', (req, res) => {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    const updatedDelivery = deliveryService.updateLocation(id, latitude, longitude);

    if (updatedDelivery) {
        res.status(200).json(updatedDelivery);
    } else {
        res.status(404).json({ error: 'Entrega não encontrada' });
    }
});

// Endpoint para consultar o status da entrega
app.get('/deliveries/:id', (req, res) => {
    const { id } = req.params;
    const delivery = deliveryService.getDelivery(id);

    if (delivery) {
        res.status(200).json(delivery);
    } else {
        res.status(404).json({ error: 'Entrega não encontrada' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});