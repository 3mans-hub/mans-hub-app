import io from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect() {
        if (!this.socket) {
            this.socket = io('http://localhost:6969');
            console.log("서버와 연결되었습니다."); // 연결 확인 로그
        }
    }

    sendJoinVoiceChannel(groupName) {
        if (!this.socket) return;
        this.socket.emit('join-voice-channel', { group: groupName });
        console.log(`${groupName} 그룹의 음성 채널에 참여 요청을 보냈습니다.`);
    } // 위 요청을 서버의 TurnCredentialsService 에서 처리

    on(event, callback) {
        if (!this.socket) return;
        this.socket.on(event, callback);
    }

    sendOffer(offer) {
        this.socket.emit('offer', offer);
    }

    sendAnswer(answer) {
        this.socket.emit('answer', answer);
    }

    sendIceCandidate(candidate) {
        this.socket.emit('ice-candidate', candidate);
    }
}

const socketService = new SocketService();
export default socketService;