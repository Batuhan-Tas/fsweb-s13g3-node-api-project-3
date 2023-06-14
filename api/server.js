const express = require("express");

const userRouter = require("./users/users-router");
const server = express();

server.use(express.json());

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

server.use("/api/users", userRouter);

module.exports = server;
