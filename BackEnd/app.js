const express = require("express");
const cors = require("cors");
const server = express();

const socketLogic=require("./business-logic-layer/socket-logic");
const usersController=require("./controllers-layer/users-controller");
const vactionsController= require("./controllers-layer/vacation-controller")
server.use(cors());
server.use(express.json());



server.use("/api",usersController);
server.use("/api",vactionsController);

server.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});



let lisener=  server.listen(4000, () => {
    console.log("Listening on 4000");
}).on("error", (err) => {
    console.log(err);
    if (err.code === "EADDRINUSE")
    console.log("Error: Address in use");
    else 
    console.log("Error: Unknown error");
});
socketLogic.SoketInit(lisener);

