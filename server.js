const express = require("express");
const cors = require("cors");
const PORT = 9999;

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

let rooms = new Map();

app.use(cors());
app.use(express.json());

app.get("/rooms/:id", (req, res) => {
    const { id: room } = req.params;
    const data = rooms.has(room)
        ? {
              users: [...rooms.get(room).get("users").values()],
              messages: [...rooms.get(room).get("messages").values()],
          }
        : { users: [], messages: [] };
    res.json(data);
});

app.post("/rooms", (req, res) => {
    const { room, userName } = req.body;
    if (!rooms.has(room)) {
        rooms.set(
            room,
            new Map([
                ["users", new Map()],
                ["messages", []],
            ])
        );
    }
    res.send();
});

//////////////////////////

io.on("connection", (socket) => {
    socket.on("ROOM:JOIN", ({ room, userName }) => {
        socket.join(room);
        rooms.get(room).get("users").set(socket.id, userName);
        const users = [...rooms.get(room).get("users").values()];
        socket.to(room).emit("ROOM:SET_USERS", users); // connecting users view for everyone and you as well
    });
    socket.on("ROOM:NEW_MESSAGE", ({ room, userName, text }) => {
        const data = {
            userName,
            text,
        };
        rooms.get(room).get("messages").push(data);
        socket.to(room).emit("ROOM:NEW_MESSAGE", data);
    });
    console.log("user connected", socket.id);
    socket.on("disconnect", () => {
        rooms.forEach((value, room) => {
            if (value.get("users").delete(socket.id)) {
                const users = [...value.get("users").values()];
                socket.to(room).emit("ROOM:SET_USERS", users);
            }
        });
    });
});

server.listen(PORT, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log(`Server is working on port ${PORT}`);
});
