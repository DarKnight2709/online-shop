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



API:
🔐 Login API
•	Method: POST
•	URL: http://localhost:5000/api/auth/login
•	Body:
{ username, password }
•	Response:
o	200 OK – { message: "Login successful" }
o	401 Unauthorized – { message: "Invalid username or password" }
o	500 Internal Server Error – { message: "Internal Server Error" } (Lỗi hệ thống chung)
o	500 Internal Server Error – { message: "Login failed" } (Lỗi khi lưu session hoặc đăng nhập)
________________________________________
📝 Register API
•	Method: POST
•	URL: http://localhost:5000/api/auth/register
•	Body:
{ username, email, phone, password, confirmPassword }
•	Response:
o	201 Created – { message: "User register successfully!" }
o	400 Bad Request – { message: "This name is already in use" }
o	400 Bad Request – { message: "This email is already in use" }
o	400 Bad Request – { message: "Passwords do not match!" }
o	500 Internal Server Error – { message: "Internal Server Error" }
________________________________________
🔓 Logout API
•	Method: DELETE
•	URL: http://localhost:5000/api/auth/logout
•	Response:
o	200 OK – { message: "Logout successful." }
o	400 Bad Request – { message: "Logout failed. User is still authenticated." }
o	500 Internal Server Error – { message: "Internal Server Error" }

