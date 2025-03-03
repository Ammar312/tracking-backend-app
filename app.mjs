import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("send-location", (data) => {
    io.emit("recieve-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});
server.listen(PORT, () => console.log(`PORT is running on ${PORT}`));
