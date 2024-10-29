const LOCAL_PORT = 6969;
const LOCAL_FRONT = 3000;

const clientHostName = window.location.hostname;

let backendHostName;
let frontendHostName;

if (clientHostName === "localhost") {
  backendHostName = "http://localhost:" + LOCAL_PORT;
  frontendHostName = "http://localhost:" + LOCAL_FRONT;
} else {
  backendHostName = 'http://3.34.167.124:6969';
  frontendHostName = "http://app-deploy0918.s3-website.ap-northeast-2.amazonaws.com";
}


export const API_BASE_URL = backendHostName;
const APP_BASE_URL = frontendHostName;


const CHAT = "/chat-websocket"

export const CHAT_URL = API_BASE_URL + CHAT;


export const RESOURCES_URL = API_BASE_URL;
