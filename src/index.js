const express = require("express");
const app = express();
const cluster = require("cluster"); 
const totalCPUs = require("os").cpus().length;
const httpStatus = require('http-status-codes');
const commonErrorHandler = require("./utils/errorHandler");
const testRoutes = require('./routers/test');
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/test',testRoutes);

app.use(commonErrorHandler);
app.get("/", (req, res) => {
  res.send("Welcome To AIOM");
});

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
