const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/userRoutes'));
app.use('/pets', require('./routes/petRoutes'));

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando...');
});