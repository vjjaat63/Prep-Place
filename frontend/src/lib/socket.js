import { io } from "socket.io-client";

let API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
if (API_URL.endsWith("/api")) {
  API_URL = API_URL.slice(0, -4);
}

export const socket = io(API_URL, {
  withCredentials: true,
  autoConnect: false, // We will connect manually when entering a session
});
