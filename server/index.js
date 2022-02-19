import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';

import userRoutes from './routes/users.js';
import feedbackRoutes from './routes/feedbackRequests.js';
import commentRoutes from './routes/comments.js';

const app = express();
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/comments', commentRoutes);

/* app.get('/', (req, res) => {
    res.send('working');
}); */
//sdf
import fs from 'fs';
import User from './models/user.js';
import Feedback from './models/feedbackRequest.js';


mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
        /* fs.readFile('requests.json', (err, data) => {
            if(err) {
                console.log(err);
            }
            else{
                let d = JSON.parse(data).productRequests;
                console.log(d);

                try {
                    d.forEach(item => {
                        const feed = new Feedback(item);
                        
                        feed.save();
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        }) */
    })
    .catch((error) => {
        console.log(error.message);
    });
