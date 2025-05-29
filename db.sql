-- use Postgres

CREATE DATABASE onlineshop;

CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address TEXT,
    phone VARCHAR(20)
);
