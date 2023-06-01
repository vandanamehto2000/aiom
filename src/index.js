const express = require("express");
const cors = require('cors');
const app = express();
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
const httpStatus = require("http-status-codes");
const commonErrorHandler = require("./utils/errorHandler");
const mongodb = require("./dbConfig/mongodbconfig");
const userRoute = require("./routers/user");
const facebookRoute = require("./routers/facebook");
const path = require("path");;
require("dotenv").config();
mongodb.on("open", function () {});
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/facebook", facebookRoute);
app.use(commonErrorHandler);
app.get("/", (req, res) => {
  res.send("Welcome To AIOM");
});

process.on('warning', e => console.warn(e.stack));

app.use('/uploads', express.static('./uploads'));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// if (cluster.isMaster) {
//     console.log(`Number of CPUs is ${totalCPUs}`);
//     console.log(`Master ${process.pid} is running`);

//     // Fork workers.
//     for (let i = 0; i < totalCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on("exit", (worker, code, signal) => {
//         // console.log(`worker ${worker.process.pid} died`);
//         // console.log("Let's fork another worker!");
//         cluster.fork();
//     });
// } else {
//     app.get("/", (req, res) => {
//         res.send("Welcome To AIOM");
//       });
//     app.listen(port, () => {
//       console.log(`Server started on port ${port}`);
//     });
// }
