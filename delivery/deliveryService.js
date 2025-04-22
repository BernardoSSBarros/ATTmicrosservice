const geolocationAPI = require('./geolocationAPI');
const deliveries = {};  // Armazenamento temporário em memória
 
let deliveryIdCounter = 1;
 
// Função para iniciar uma entrega
function createDelivery() {
    const id = deliveryIdCounter++;
    const delivery = {
        id,
        status: 'Iniciada',
        location: geolocationAPI.getRandomLocation(),
        timestamp: new Date().toISOString(),
    };
    deliveries[id] = delivery;
    return delivery;
}
 
// Função para atualizar a localização da entrega
function updateLocation(id, latitude, longitude) {
    const delivery = deliveries[id];
    if (delivery) {
        delivery.location = { latitude, longitude };
        delivery.timestamp = new Date().toISOString();
        return delivery;
    }
    return null;
}
 
// Função para consultar uma entrega
function getDelivery(id) {
    return deliveries[id] || null;
}
 
module.exports = {
    createDelivery,
    updateLocation,
    getDelivery
};