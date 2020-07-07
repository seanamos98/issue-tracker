const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// routes
app.get("/", (req, res) => {
  res.send("we are on home");
});

// bodyParser middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// import routes
const projectsRoute = require("./routes/projects");
app.use("/api/projects", projectsRoute);
// import routes
const issuesRoute = require("./routes/issues");
app.use("/api/issues", issuesRoute);

//connect to mongo
mongoose.connect(
  process.env.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  },
  () => console.log("db connected")
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server start on port ${port}`));
