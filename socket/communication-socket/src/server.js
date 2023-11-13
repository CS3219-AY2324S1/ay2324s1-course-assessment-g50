require('dotenv').config()
// Env files
SOCKET_IO_PORT = process.env.SOCKET_IO_PORT
FRONTEND_URL = process.env.FRONTEND_URL

/* Socket IO portion: */
const io = require("socket.io")(SOCKET_IO_PORT, {
    cors: {
        origin: FRONTEND_URL,
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};


io.on("connection", (socket) => {
    // Logger when connected
    console.log("a user connected.");

    // Take userId and socketId from user and create a new user in socket session.
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
    });

    // Send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
    });
});