import express from 'express';
import {ENV} from './lib/env.js';
// import cookieParser from 'cookie-parser';
import path from 'path';
import { connectDB } from './lib/db.js';


import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';


const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT;

app.use(express.json()); // need to add this for parsing JSON bodies too
// app.use(cookieParser()); // usually needed for auth

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make ready for production
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});

