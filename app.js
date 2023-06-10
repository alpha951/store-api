require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error-handler.js');
const productsRouter = require('./routes/products.js');
const connectDB = require('./db/connect.js');

const PORT = process.env.PORT || 3000;

// not used in this project but can be used to serve static files in json format
app.use(express.json())


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