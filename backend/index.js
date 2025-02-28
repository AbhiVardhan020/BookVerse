
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

mongoose.connect('mongodb+srv://abhivardhan:abhivardhan@cluster0.vrhaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
