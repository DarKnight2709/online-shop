# online-shop
dự án web về website bán hàng thiết bị điện tử online

![ERD Diagram](/public/erd_diagram.png)


- Admin: adminID, username, passwordHash, email
- Order: orderID, orderDate, quantity, total, status, productID, userID,
- Product: productID, productName, description, price, quantityInStock, imageURL, brandID, categoryID
- User: userID, username, passwordHash, email, address, phone
- Cart: cartID, userID
- CartItem: cartItemID, quantity, price, cartID, productID
- Brand: brandID, name
- Category: categoryID, name


cách cài đặt:

1. tạo database và table như trong file db.sql
1.1 Tạo file .env với các biến 
  - DATABASE = 
  - DATBASE_HOST = localhost
  - DATABASE_ROOT = root
  - DATABASE_USER = 
  - DATABASE_PASSWORD = 

2. mở 2 terminal (1 cho client, 1 cho server)

3. terminal 1: chuyển đến thư mục client:
  npm install
  npm start
4. terminal 2: tại thư mục gốc
  npm install
  npm start



  