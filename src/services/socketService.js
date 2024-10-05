import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class SocketService {
    constructor() {
        this.stompClient = null;
    }

    connect() {
        const socket = new SockJS('http://localhost:6969/ws');
        this.stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log('STOMP: ' + str);
            }
        });

        this.stompClient.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe('/topic/join-voice-channel', (message) => {
                console.log('Received message:', message.body);
            });
        };

        this.stompClient.activate();
    }

    sendJoinVoiceChannel(groupName) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.publish({
                destination: '/app/join-voice-channel',
                body: JSON.stringify({ group: groupName })
            });
            console.log(`${groupName} 그룹의 음성 채널에 참여 요청을 보냈습니다.`);
        }
    }
}

const socketService = new SocketService();
export default socketService;