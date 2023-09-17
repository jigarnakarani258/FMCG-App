const express = require('express')
const app = express();


const {AppError} =require('./utility/appError')
const { userRouter } = require(`${__dirname}/routes/userRoutes.js`)
const { productRouter } = require('./routes/productRoutes');
const {globalErrController} = require('./controllers/errorController')

const cors = require('cors');
const bodyParser = require('body-parser')
const passport = require('passport');
const { orderRouter } = require('./routes/orderRoutes');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use( express.json() );
app.use( (req , res , next) =>{
    req.requestTime = new Date().toISOString();
    next()       //if you forgot to call next function then response will not get of API
})

//read static file
app.use(express.static(`${__dirname}/public`))
app.use('/api/v1', userRouter)
app.use('/api/v1', productRouter)
app.use('/api/v1', orderRouter)

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
