require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1); // Detiene la ejecución si hay un error
    }
};

module.exports = connectDB;
