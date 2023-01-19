const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// middleware******
app.use(express.json());

//serving static files
app.use(express.static(`${__dirname}/public`))

// custom middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// creating custom middleware******
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    // required
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().getTime();
    next()
})

// setting up routes*****
// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Hello from the server side!', app: 'Natours' });
// })

// app.post('/', (req, res) => {
//     res.send('You can ')
// })

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
