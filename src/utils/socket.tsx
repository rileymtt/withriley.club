import { Socket, io } from "socket.io-client";
import { AppConfig } from "../settings";

export let socket: Socket;

export const initSocket = (accessKey: string | null) => {
  try {
    const socketOptions = {
      auth: {
        token: accessKey ? accessKey : "Anonymous",
      },
      transports: ["websocket"],
      upgrade: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
      reconnectionDelayMax: 10000,
      timeout: 10000,
      path: "/wfb/socket.io",
    };

    socket = io(AppConfig.WS, socketOptions);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
  } catch (error) {
    console.error(error);
  }
};

export const disconnectSocket = () => {
  socket.disconnect();
};
