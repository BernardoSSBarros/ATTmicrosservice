CREATE DATABASE delivery_db;
USE delivery_db;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE dishes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categories(id)
);

CREATE TABLE restaurantes (
  id_restaurante INT AUTO_INCREMENT PRIMARY KEY,
  nome_restaurante VARCHAR(100) NOT NULL,
  cep_restaurante VARCHAR(10) NOT NULL
);
