import express from "express";
import { Server } from "socket.io";
import http from "http";
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => console.log(`PORT is running on ${PORT}`));
