const express = require('express')
const app = express();

const {globalErrController} = require('./controllers/errorController')
const {AppError} =require('./utility/appError')
const { userRouter } = require(`${__dirname}/routes/userRoutes.js`)
const { productRouter } = require('./routes/productRoutes');
const { orderRouter } = require('./routes/orderRoutes');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const cors = require('cors');
const bodyParser = require('body-parser')
const passport = require('passport');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use( express.json() );
app.use( (req , res , next) =>{
    req.requestTime = new Date().toISOString();
    next();
})

//read static file
app.use(express.static(`${__dirname}/public`))
app.use('/api/v1', userRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', orderRouter)

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'FMCG-APP',
            description: `FMCG (Fast Moving Consumer Goods) apps have various use cases across different stages.
                            In this app we manage user , prodct and order management.`
        },
        tags: [
            {
                name: 'User Management',
                description: 'User management related APIs .',
            },
            {
                name: 'Product Management',
                description: 'Product management related APIs .',
            },
            {
                name: 'Order Management',
                description: 'Order management related APIs .',
            },
        ],
        securityDefinitions: {
            jwt: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
        basePath: '/api/v1',
    },
    apis: [
        "./routes/userRoutes.js",
        "./routes/productRoutes.js",
        "./routes/orderRoutes.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//set local variable with request for user-role based permission
app.use((req, res, next)=>{
    req.app.locals = {
        pemission_flag : false,
        pemission_message : ''
    } ;
    next();
  });

//passport authentication 
app.use(passport.initialize());
require(`${__dirname}/utility/passport.js`)


//here app.all use for all method(get,post,put,delete)
//Unhandled Routes Handling 
app.all('*',(req,res,next)=>{
    let err = {
        name : 'customPathError',
        message : `Can not find route ${req.originalUrl} on this server, Please check API route.`
    }
    return next(new AppError(err, 404));
})

//Global error Middleware // Ex->{ next(err)} 
app.use(globalErrController)

module.exports = app;
