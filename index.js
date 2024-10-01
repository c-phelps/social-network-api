const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = 3001;
// create a new express instance as app
const app = express();


const activity = cwd.includes('Develop')
  ? cwd.split('Develop')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use ./routes for modular routing (routes/index.js file will be served first)
app.use(routes);

// once the connection is open, set the express app to listen on the port number above
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});