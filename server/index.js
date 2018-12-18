require('dotenv').config()
const express = require('express');
const { json } = require('body-parser');
const session = require('express-session');
const { checkForSession } = require('./middlewares/checkForSession');
const { read } = require('./controllers/swag_controller');
const { login, getUser, register, signOut } = require('./controllers/auth_controller');
const { add, deleteSwag, checkout } = require('./controllers/cart_controller');
const { search } = require('./controllers/search_controller');
let { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(express.static(`${__dirname}/../build`))
app.use(json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
app.use(checkForSession)

app.get('/api/swag', read);
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signOut);
app.get('/api/user', getUser);
app.post('/api/cart', add);
app.post('/api/cart/checkout', checkout);
app.delete('/api/cart', deleteSwag);
app.get('/api/search', search);

const port = SERVER_PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`))