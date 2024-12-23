import express from 'express';
import dotenv from 'dotenv';
import usersRoutes from './src/routes/users.routes.js';
import sessionsRoutes from './src/routes/sessions.routes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import initializePassport from './src/config/passport.config.js';
import passport from 'passport';
import productsRoutes from './src/routes/products.routes.js'

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
initializePassport();

app.use(passport.initialize());
app.use('/static',express.static('public'));
app.use('/api/users', usersRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/products', productsRoutes);


mongoose.connect(process.env.MONGO, )
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));
    
app.listen(process.env.PORT, () => console.log('Server escuchando en puerto ' + process.env.PORT));





