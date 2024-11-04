const LOCAL_PORT = 6969;
const LOCAL_FRONT = 3000;

const clientHostName = window.location.hostname;

let backendHostName;
let frontendHostName;
let ip;

if (clientHostName === "localhost") {
  ip = "localhost"
  backendHostName = "http://localhost:" + LOCAL_PORT;
  frontendHostName = "http://localhost:" + LOCAL_FRONT;
  console.log(ip)
} else {
  ip = "15.164.119.29"
  backendHostName = 'http://15.164.119.29:6969';
  frontendHostName = "http://app-deploy0918.s3-website.ap-northeast-2.amazonaws.com";
  console.log(ip)
}


export const API_BASE_URL = backendHostName;
const APP_BASE_URL = frontendHostName;
export const publicIp = ip;

const CHAT = "/chat-websocket"

export const CHAT_URL = API_BASE_URL + CHAT;


export const RESOURCES_URL = API_BASE_URL;
