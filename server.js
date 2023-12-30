const path = require("path");
const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const moment = require('moment');


const routes = require('./controllers');
const sequelize = require("./config/connection");

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3002;

const hbs = exphbs.create({
  helpers: {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
},
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port:', PORT));
}).catch((error) => {
  console.error('Error syncing database:', error);
});