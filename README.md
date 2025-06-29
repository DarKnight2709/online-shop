
# 🛒 Online Shop – Thiết bị điện tử

Dự án web về website bán hàng thiết bị điện tử online

![ERD Diagram](/public/erd_diagram.png)

## 🗂️ Mô hình cơ sở dữ liệu
- User: <u>username</u>, passwordHash, email, address, phone, role
- Order: <u> orderID</u>, orderDate, quantity, total, status, productID, userID  
- Product: <u>productID</u>, productName, description, price, quantityInStock, imageURL, brandID, categoryID  
- Orders_Products:  <u>orderID, productID</u>, orderedQuantity
- Cart: <u>cartID</u>, userID  
- CartItem: <u>cartItemID</u>, quantity, price, cartID, productID  
- Brand: <u>brandID</u>, name  
- Category: <u>categoryID</u>, name  

## ⚙️ Hướng dẫn cài đặt

1. Tạo database và table như trong file db.sql  
1.1 Tạo file .env với các biến:  
   - DATABASE =  
   - DATABASE_HOST = localhost  
   - DATABASE_ROOT = root  
   - DATABASE_USER =  
   - DATABASE_PASSWORD =  

2. Mở 2 terminal (1 cho client, 1 cho server)  

3. Terminal 1: chuyển đến thư mục client:  
   ```
   npm install  
   npm start  
   ```

4. Terminal 2: tại thư mục gốc:  
   ```
   npm install  
   npm start  
   ```

---

## 📱 API
### 🔐 Admin Login API
- **Method:** POST  
- **Body:** (username, password)  
- **URL:** http://localhost:5000/api/auth/admin

**Response:**  
- 200 OK – body: `{ "message" : "Login successful" }`  
- 401 Unauthorized – body: `{ "message" : "Invalid username or password" }`  
- 500 Internal Server Error – body: `{ "message" : "Internal Server Error" }` // Lỗi hệ thống chung  
- 500 Internal Server Error – body: `{ "message" : "Login failed" }` // Lỗi khi lưu session hoặc đăng nhập  

---


### 🔐 User Login API
- **Method:** POST  
- **Body:** (username, password)  
- **URL:** http://localhost:5000/api/auth/login  

**Response:**  
- 200 OK – body: `{ "message" : "Login successful" }`  
- 401 Unauthorized – body: `{ "message" : "Invalid username or password" }`  
- 500 Internal Server Error – body: `{ "message" : "Internal Server Error" }` // Lỗi hệ thống chung  
- 500 Internal Server Error – body: `{ "message" : "Login failed" }` // Lỗi khi lưu session hoặc đăng nhập  

---

### 📝 Register API 
- **Method:** POST  
- **Body:** (username, email, phone, password, confirmPassword)  
- **URL:** http://localhost:5000/api/auth/register  

**Response:**  
- 201 Created – body: `{ "message": “User register successfully!” }`  
- 400 Bad Request – body: `{ "message": "This name is already in use" }`  
- 400 Bad Request – body: `{ "message": "This email is already in use" }`  
- 400 Bad Request – body: `{ "message": "Passwords do not match!" }`  
- 500 Internal Server Error – body: `{ "message": "Internal Server Error" }`  

---

### 🔓 Logout API
- **Method:** DELETE  
- **URL:** http://localhost:5000/api/auth/logout  

**Response:**  
- 200 OK – body: `{ "message": "Logout successful." }`  
- 400 Bad Request – body: `{ "message": "Logout failed. User is still authenticated." }`  
- 500 Internal Server Error – body: `{ "message": "Internal Server Error" }` 

---


### Products APIs
**Get all products**
- **Method:** GET
- **URL:** http://localhost:5000/api/products  

- **Response:**  
   - 200 OK – body: `{ "products" : "[{}, {}]"}`  
   - 400 Bad Request – body: `{ "message": "No Products Found" }`  
--

**Search products by keyword**
- **Method:** GET
- **URL:** http://localhost:5000/api/products/search?searchTerm=".."

- **Response:**  
   - NOTE: {productid, productname, description, price, quantityinstock, imageurl, brandid, categoryid}
   - 200 OK – body: `{ "products" : "[{}, {}]"}`  
   - 400 Bad Request – body: `{ "message" : "Search term is required" }`  

--


**Get product by id**
- **Method:** GET
- **URL:** http://localhost:5000/api/products/:productId

- **Response:**  
   - 200 OK – body: `{ "product" : "[{}]"}`  
   - 400 Bad Request – body: `{ "message": "Product Not Found" }`  

--


**Add new product**
- **Method:** POST
- **URL:** http://localhost:5000/api/products

- **Response:**  
   - 201 Created – body: `{ "product" : "[{}]"}`  
   - 500 Internal Server Error – body: `{ "message": "Database connection error" }` 

--


**Edit product**
- **Method:** POST
- **URL:** http://localhost:5000/api/products/:productId

-  **Response:**  
   - 201 Created – body: `{ "product" : "[{}]"}`  
   - 400 Bad Request – body: `{ "message": "Product Not Found" }`
   - 500 Internal Server Error – body: `{ "message": "Database connection error" }` 

--


**Delete product**
- **Method:** POST
- **URL:** http://localhost:5000/api/products/:productId

- **Response:**  
   - 200 OK – body: `{ "product" : "[{}]"}`  
   - 400 Bad Request – body: `{ "message": "Product Not Found" }`
   - 500 Internal Server Error – body: `{ "message": "Database connection error" }` 


## 💻 Công nghệ sử dụng

- **Frontend**: ReactJS
- **Backend**: Node.js, Express, PassportJS
- **Database**: PostgreSQL