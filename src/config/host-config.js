const LOCAL_PORT = 6969;
const LOCAL_FRONT = 3000;

const clientHostName = window.location.hostname;

let backendHostName;
let frontendHostName;

if (clientHostName === "localhost") {
  backendHostName = "http://localhost:" + LOCAL_PORT;
  frontendHostName = "http://localhost:" + LOCAL_FRONT;
} else {
  // backendHostName = 'http://43.203.105.27:8888';
  // frontendHostName = "http://doggle.kr";
}


const API_BASE_URL = backendHostName;
const APP_BASE_URL = frontendHostName;


const CHAT = "/chat-websocket"

export const CHAT_URL = API_BASE_URL + CHAT;


export const RESOURCES_URL = API_BASE_URL;
