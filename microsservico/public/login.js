const baseURL = 'http://localhost:3000';
const responseDiv = document.getElementById('response');
 
const showResponse = (message, isSuccess = true) => {
  responseDiv.textContent = message;
  responseDiv.classList.toggle('success', isSuccess);
  responseDiv.classList.toggle('error', !isSuccess);
};
 
document.getElementById('userRegisterForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
 
  try {
    const res = await fetch(`${baseURL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
 
    if (res.ok) {
      showResponse('Cliente cadastrado com sucesso!', true);
    } else {
      throw new Error('Erro ao cadastrar cliente');
    }
  } catch (error) {
    showResponse(error.message, false);
  }
});
 
document.getElementById('restaurantRegisterForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
 
  try {
    const res = await fetch(`${baseURL}/restaurants/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
 
    if (res.ok) {
      showResponse('Restaurante cadastrado com sucesso!', true);
    } else {
      throw new Error('Erro ao cadastrar restaurante');
    }
  } catch (error) {
    showResponse(error.message, false);
  }
});
 
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
 
  try {
    const res = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
 
    if (res.ok) {
      showResponse('Login bem-sucedido!', true);
    } else {
      throw new Error('Email ou senha inválidos');
    }
  } catch (error) {
    showResponse(error.message, false);
  }
});