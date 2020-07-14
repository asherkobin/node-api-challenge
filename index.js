const express = require("express");
const server = express();
const portNum = 5050;
const actionsRouter = require("./routers/actionsRouter");
const projectsRouter = require("./routers/projectsRouter");
const cors = require("cors");

server.use(express.json());
server.use(cors());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.status(200).json("Hello World");
});

server.listen(portNum, () => {
  console.log("Express Running...");
})