## React Ecommerce Web application

This is a full featured eCommerce web application using the MERN stack. You can [check out the demo](https://react-ecommerce-app-cmix.onrender.com/) which is hosted on render website. 

*P.S: Since it is hosted on a free tier, the server instance may shut down due to inactivity and will take some time to load since it will try to bring the server up again*

---
### Sample User Logins
```
admin@email.com (Admin)
123456

steve@gmail.com (Customer)
123456

```

### Features
- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- Database seeder (products & users)

### Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'

```
### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
