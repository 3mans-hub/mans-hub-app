
// socket.io 클라이언트 설정 및 메시지 전송을 위한 파일

import io from 'socket.io-client';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect() {
        this.socket = io('http://localhost:8080');
    }

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