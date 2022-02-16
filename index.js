const
  express = require('express'),
  cors = require('cors'),
  env = require('dotenv').config().parsed,
  compression = require('compression'),
  routes = require('./routes/index'),
  app = express();

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(compression());

/** Cors handling */
const corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Token"
  );
  next();
});

/** Declare app routes */
app.use(routes);

// Disable unused route
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Listen server
app.listen(env.PORT, () => {
  console.log(`Server started on port ${env.PORT}`);
})