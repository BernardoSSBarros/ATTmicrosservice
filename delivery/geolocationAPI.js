// Simulação de uma API de geolocalização que retorna coordenadas aleatórias
function getRandomLocation() {
    const latitude = (Math.random() * 180 - 90).toFixed(6);  // Gera uma latitude aleatória entre -90 e 90
    const longitude = (Math.random() * 360 - 180).toFixed(6); // Gera uma longitude aleatória entre -180 e 180
    return { latitude, longitude };
}
 
module.exports = {
    getRandomLocation
};