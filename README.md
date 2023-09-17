#  Welcome to FMCG-App
FMCG - Web APP

Greetings to all. In this project, we'll build a backend for web applicationtion using MERN stack Fast Moving Consumer Goods-App. We'll examine how to use passport-jwt strategy for user authentication. Use the FMCG - Web APP for User , Product , Order management and relation management. 

# Features
FMCG - Web APP has 3 type of users , 1) Admin 2)Selller 3)Customer. 
This App provide role based accessed functionality to the user. 
This App also provide filtering based on attribute , pagination for retriving large data into page wise and user authentication.
You can also access this app using swagger-UI and postman-collection.

# Technologies to use
Backend Development - Express.js / Node.js
User Authentication - passport-jwt strategy
Database - MongoDB
ODM - Mongoose library
Follow Strandard Arcitecture - Add ErrorController and Middlewares

# Working with the Project
Download this project from the above link. check configaration file into the project named with "config.env"
check config.env file and put this code inside it if it is not present there.

config.env
```
NODE_ENV = production 
PORT = 3000
DATABASE_LOCAL = mongodb://127.0.0.1:27017/FMCG_APP

JWT_SECRETKEY=my-super-secret-key-for-project
JWT_EXPIRESIN=30d
```

*********************** Write command for start the back-end server ************************
Download FMCG-App package from this GitHub repo. 
1). Now install all dependencies using below command , 
Open Terminal and hit this command:- npm install 

Start server using below command Open Terminal and hit this command:- 
command:- npm run start 

Now open any Browser
Request on this server http://localhost:3000 , This request load swagger-ui of this project with 3 section.

Check below functionality. 
a) User Management with - User Authentication.
b) Product Management :- filtering based on product's attribute , pagination for retriving large data into page wise and addProduct , setProductAvailbility, Retrive All products , Product sellers.
c) Order Management :- filtering based on Order's attribute , pagination for retriving large data into page wise and OrderPlaced, update Order_status , cancelOrder , customers. 

You can Check backend API using postman collection also. 
Import This collection in your postman – app FMCG_APP_PracticalTask.postman_collection.json 
Make API request on http://localhost:3000/api/v1 on NodeJs server.