
// WebRTC 관련 로직, 설정 관리

import socketService from "./socketService";

export const createPeerConnection = (remoteVideoRef) => {
    const peerConnection = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'turn:YOUR_TURN_SERVER_URL', username: 'user', credential: 'password' }
        ],
    });

    peerConnection.ontrack = ({ streams: [stream] }) => {
        remoteVideoRef.current.srcObject = stream;
    };

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
        return screenStream;
    } catch (error) {
        console.error("Error getting screen share stream", error);
    }
};