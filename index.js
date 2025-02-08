// Servidor y conexión a MongoDB

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post');

const app = express();
app.use(express.json());
app.use('/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado correctamente'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));


const PORT = process.env.PORT || 3000;

// Solo inicia el servidor si el archivo no está siendo testeado
if (process.env.NODE_ENV !== 'test') {
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

}

// Exportamos app para que Jest pueda usarlo en los tests
module.exports = app;

