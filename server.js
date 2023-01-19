const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({
    path: './.env'
});

//connecting to database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then((con) => {
    console.log('Connected')
});

// port for the app to listen to******
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})