-- use Postgres

CREATE DATABASE onlineshop;

-- ========================
-- 1. Bảng User
-- ========================
CREATE TABLE Users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address TEXT,
    phone VARCHAR(15)
);

-- ========================
-- 2. Bảng Brand
-- ========================
CREATE TABLE Brands (
    brandID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- 3. Bảng Category
-- ========================
CREATE TABLE Category (
    categoryID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- 4. Bảng Product
-- ========================
CREATE TABLE Products (
    productID SERIAL PRIMARY KEY,
    productName VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    quantityInStock INT NOT NULL DEFAULT 0,
    imageURL TEXT,
    brandID INT REFERENCES Brands(brandID) ON DELETE SET NULL,
    categoryID INT REFERENCES Category(categoryID) ON DELETE SET NULL
);

-- ========================
-- 5. Bảng "Order"
-- ========================
CREATE TABLE Orders (
    orderID SERIAL PRIMARY KEY,
    orderDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    userID INT REFERENCES Users(userID) ON DELETE CASCADE
);


CREATE TABLE Orders_Products (
    orderID INT REFERENCES Orders(orderID) ON DELETE CASCADE,
    productID INT REFERENCES Products(productID) ON DELETE CASCADE,
    orderedQuantity INT NOT NULL,
    unitPrice NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (orderID, productID)
);


-- ========================
-- 6. Bảng Cart
-- ========================
CREATE TABLE Carts (
    cartID SERIAL PRIMARY KEY,
    userID INT UNIQUE REFERENCES Users(userID) ON DELETE CASCADE
);

-- ========================
-- 7. Bảng CartItem
-- ========================
CREATE TABLE CartItems (
    cartItemID SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    cartID INT REFERENCES Carts(cartID) ON DELETE CASCADE,
    productID INT REFERENCES Products(productID) ON DELETE CASCADE
);
