const express = require("express");
const path = require("path");
const { connectToMongoDb } = require("./connection");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8001;
const {
  redirectToActualURL,
  serverSideRenderingTest,
} = require("./controllers/url");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/adminRoute");
const app = express();

// const mongoUrl = process.env.MONGO_URL_LOCAL;
const mongoUrl = process.env.MONGO_URL;
// console.log(mongoUrl);
connectToMongoDb(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
}).then(() => console.log("Mongo Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/admin/url", restrictTo(["ADMIN"]), adminRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", redirectToActualURL);
app.get("/server/test", serverSideRenderingTest);
app.listen(PORT, () => console.log("server started"));
