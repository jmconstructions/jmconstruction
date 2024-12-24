const path = require("path");
const express = require("express");
const morgan = require("morgan");
const limiter = require("express-rate-limit");
const monogsantize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");
const cookieparser = require("cookie-parser");
const compression = require("compression");
const AppError = require("./utils/appErrors");
const siteRouter = require("./Routes/siteReportRoutes");

const userRouter = require("./Routes/userRoutes");
const app = express();
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false }));

const ratelimiter = limiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many request from this api please try again in an hour",
});
const cors = require("cors");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      origin: true,
      optionsSuccessStatus: 200,
      allowedHeaders: [
        "set-cookie",
        "Content-Type",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Credentials",
      ],
    })
  );
}

app.use(cookieparser());

//data sanitization against NoSQL query injection
app.use(monogsantize());
//Data sanitization--malicious html code
app.use(xss());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/sitereport", siteRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "view/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "view", "dist", "index.html"));
//   });
// }
if (process.env.NODE_ENV === "production") {
  // Serve static files from the React build directory
  app.use(express.static(path.join(__dirname, "view/dist")));
  app.use("/assets", express.static(path.join(__dirname, "view/dist/assets")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "view", "dist", "index.html"));
  });
}
app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} url`));
});
module.exports = app;
