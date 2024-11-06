// src/utils/socket.js
import { io } from "socket.io-client";

const socket = io('http://192.168.3.246:5173'); // Replace with your WebSocket server URL

export default socket;
