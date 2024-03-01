const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./Routes/authRote');

const PORT = process.env.PORT || 3000;
// to Config the path
dotenv.config({ path: './config.env' });
require('./db/conn');

// to Enable Cors To CommunucateBetwee Two Fronta and Back
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: 'include',
    optionSuccessStatus: 200,
    methods: ['GET', 'POST'],
  })
);
// to Understand json in server configuration
app.use(express.json());
// to show serve that the Incomign Rew will be strings or Array
app.use(express.urlencoded({ extended: true }));
// Routes
// For Drfining only End Point
app.use(authRoute);

app.listen(PORT, () => {
  console.log('Server is listening on port' + PORT);
});
