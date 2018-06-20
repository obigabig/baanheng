const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys/keys');

//Mongoose connect
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
require('./services/passport');   //Passport middlewares

//Route with authen middleware.
authRoutes(app);

if(process.env.NODE_ENV === 'production'){
    //Map asset
    app.use(express.static('client/build'));
    //react page
    const path = require('path');
    app.get('*', (req,res) => {
      res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/*const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT);*/

console.log('Start server...');
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('Server listening on:', PORT);


