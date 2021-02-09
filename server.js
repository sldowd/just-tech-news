const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const Sequelizestore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new Sequelizestore({
    db: sequelize
  })
};

// middleware=========================================
// format json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// connect to static files
app.use(express.static(path.join(__dirname, 'public')));
// handlebars middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// session middleware
app.use(session(sess));
//======================================================


// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });