const connectToMongo = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.web_Port

//Middlewares
app.use(cors()); 
app.use(express.json()); 

//Routes
app.use('/api/pets',require('./routes/petPage'));
app.use('/api/profile',require('./routes/userPage'));

//Start server and Handle errors
try {
  app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
  })
} catch (error) {
  console.error(`Error occured: ${error.message}.`);
  process.exit(1);
}

//Connect to MongoDB
try {
  connectToMongo(); 
} catch (error) {
  console.error(`Error occured: ${error.message}.`);
  process.exit(1);
}