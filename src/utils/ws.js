/** @format */

import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Set Pusher sebagai dependency untuk Echo
window.Pusher = Pusher;

// Konfigurasi Laravel Echo
const echo = new Echo({
  broadcaster: "pusher",
  key: "go7cxuvhjsbg9antde65",
  wsHost: "192.168.3.247",
  wsPort: 8080,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  cluster: "mt1", // Tambahkan cluster default
});

export default echo;
