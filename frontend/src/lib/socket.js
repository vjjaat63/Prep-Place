import { io } from "socket.io-client";

// Get API URL from env or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const socket = io(API_URL, {
  withCredentials: true,
  autoConnect: false, // We will connect manually when entering a session
});
