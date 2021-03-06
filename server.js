const express = require('express');
const app = express();
const connectDB = require('./config/db');

// connect to db
connectDB();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function( request, response){
  response.json({msg: "Welcome To ContactKeeper"});
})

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));