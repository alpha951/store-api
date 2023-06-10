require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error-handler.js');
const productsRouter = require('./routes/products.js');
const connectDB = require('./db/connect.js');

const PORT = process.env.PORT || 3000;

// not used in this project
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('Welcome to the Store API');
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();