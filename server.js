const express = require("express");

require("dotenv").config();

const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const db = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3"
  },
  useNullAsDefault: true
});

const main = require("./controllers/main");

const app = express();

// App Middleware
const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("combined")); //tiny or combined

// App Routes
app.get("/", (req, res) => res.send("hello world"));
app.get("/crud", (req, res) => main.getTableData(req, res, db));
app.post("/crud", (req, res) => main.postTableData(req, res, db));
app.delete("/crud", (req, res) => main.deleteTableData(req, res, db));

// App Server Connection
app.listen(process.env.PORT || 5000, () => {
  console.log(`App is running on port ${process.env.PORT || 5000}`);
});
