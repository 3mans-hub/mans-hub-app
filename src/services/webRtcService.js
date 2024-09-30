
// WebRTC 관련 로직, 설정 관리

import socketService from "./socketService";

export const createPeerConnection = (remoteVideoRef) => {
    const peerConnection = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            {
                urls: 'turn:localhost:3478',           // 실제 TURN 서버 URL로 변경
                username: '1696114800',                // 생성된 username
                credential: 'generated-credential'     // 생성된 credential
            }
        ],
    });

    // 피어 연결에서 상대방의 트랙이 수신될 때 실행
    peerConnection.ontrack = ({ streams: [stream] }) => {
        remoteVideoRef.current.srcObject = stream;
    };

    // ICE 후보를 서버로 전송
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socketService.sendIceCandidate(event.candidate);
        }
    };

    return peerConnection;
};

export const getScreenShareStream = async () => {
    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

        // 화면 공유 스트림의 트랙이 중지될 때 이벤트 핸들러
        screenStream.getVideoTracks()[0].onended = () => {
            console.log("Screen sharing stopped");
            // 필요에 따라 화면 공유가 중지되었을 때의 후속 작업을 수행할 수 있습니다.
        };

        return screenStream;
    } catch (error) {
        console.error("Error getting screen share stream", error);
    }
};
