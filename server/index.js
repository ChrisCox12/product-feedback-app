import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';

import userRoutes from './routes/users.js';
import feedbackRoutes from './routes/feedbackRequests.js'; //

const app = express();
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/feedback', feedbackRoutes);

/* app.get('/', (req, res) => {
    res.send('working');
}); */




mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
