import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class SocketService {
    constructor() {
        this.stompClient = null;
        this.isConnected = false;  // 연결 상태를 확인할 변수
    }

    connect(callback) {
        const socket = new SockJS('http://localhost:6969/ws');
        this.stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log('STOMP Debug: ' + str);
            }
        });

        this.stompClient.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            this.isConnected = true;  // STOMP 클라이언트 연결 완료
            if (callback) callback();  // 연결 후 실행할 콜백 함수 호출
        };

        this.stompClient.activate();
    }

    sendJoinVoiceChannel(groupName) {
        if (this.isConnected && this.stompClient.connected) {
            this.stompClient.publish({
                destination: '/app/join-voice-channel',
                body: JSON.stringify({ group: groupName })
            });
            console.log(`${groupName} 그룹의 음성 채널에 참여 요청을 보냈습니다.`);
        } else {
            console.error('STOMP Client is not connected');
        }
    }
}

const socketService = new SocketService();
export default socketService;