🛒 Online Shop – Thiết bị điện tử
Một dự án website bán hàng thiết bị điện tử online, bao gồm hệ thống người dùng, giỏ hàng, quản lý đơn hàng và sản phẩm.



🗂️ Mô hình cơ sở dữ liệu
Bảng chính:

Admin: adminID, username, passwordHash, email

User: userID, username, passwordHash, email, address, phone

Product: productID, productName, description, price, quantityInStock, imageURL, brandID, categoryID

Order: orderID, orderDate, quantity, total, status, productID, userID

Cart: cartID, userID

CartItem: cartItemID, quantity, price, cartID, productID

Brand: brandID, name

Category: categoryID, name

⚙️ Hướng dẫn cài đặt
1. Tạo cơ sở dữ liệu
Tạo database và các bảng theo file db.sql.

Tạo file .env ở thư mục gốc với nội dung như sau:

env
Copy
Edit
DATABASE=
DATABASE_HOST=localhost
DATABASE_ROOT=root
DATABASE_USER=
DATABASE_PASSWORD=
2. Cài đặt và chạy dự án
Mở 2 cửa sổ terminal:

Terminal 1 (client):
bash
Copy
Edit
cd client
npm install
npm start
Terminal 2 (server):
bash
Copy
Edit
npm install
npm start
📡 API
🔐 Auth APIs
🔸 Login API
Method: POST

URL: http://localhost:5000/api/auth/login

Body: { username, password }

Responses:

Status	Message
200 OK	{ message: "Login successful" }
401	{ message: "Invalid username or password" }
500	{ message: "Internal Server Error" }
500	{ message: "Login failed" } (session error)

🔸 Register API
Method: POST

URL: http://localhost:5000/api/auth/register

Body: { username, email, phone, password, confirmPassword }

Responses:

Status	Message
201	{ message: "User register successfully!" }
400	{ message: "This name is already in use" }
400	{ message: "This email is already in use" }
400	{ message: "Passwords do not match!" }
500	{ message: "Internal Server Error" }

🔸 Logout API
Method: DELETE

URL: http://localhost:5000/api/auth/logout

Responses:

Status	Message
200 OK	{ message: "Logout successful." }
400	{ message: "Logout failed. User is still authenticated." }
500	{ message: "Internal Server Error" }

📌 Ghi chú
Frontend sử dụng ReactJS.

Backend sử dụng Node.js, Express, PassportJS.

Dữ liệu được lưu trữ trong MySQL.