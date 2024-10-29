import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {API_BASE_URL} from "../config/host-config";

class SocketService {
    constructor() {
        this.stompClient = null;
    }

    connect(callback) {
        const socket = new SockJS(`${API_BASE_URL}/ws`);
        this.stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log('STOMP: ' + str);
            }
        });

        this.stompClient.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            callback();
        };

        this.stompClient.activate();
    }

    sendJoinVoiceChannel(groupName) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.publish({
                destination: '/app/join-voice-channel',
                body: JSON.stringify({ group: groupName }),
            });
        } else {
            console.log("STOMP Client is not connected");
        }
    }
}

const socketService = new SocketService();
export default socketService;