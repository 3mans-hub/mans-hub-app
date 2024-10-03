import React, { useEffect } from 'react';
import socketService from "../services/socketService"; // socket.io 관련 설정을 담당하는 파일

const VoiceChannel = () => {
    useEffect(() => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'turn:localhost:3478', username: 'generated-username', credential: 'generated-credential' }
            ],
        });

        // 상대방의 미디어 스트림을 연결하기 위한 이벤트 리스너
        peerConnection.ontrack = ({ streams: [stream] }) => {
            const audioElement = document.createElement('audio');
            audioElement.srcObject = stream;
            audioElement.autoplay = true;
            document.body.appendChild(audioElement);
        };

        // ICE 후보를 서버로 전송
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socketService.sendIceCandidate(event.candidate);
            }
        };

        // 서버에서 offer 받기
        socketService.on('offer', async (offer) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socketService.sendAnswer(answer);
        });

        // 서버에서 answer 받기
        socketService.on('answer', (answer) => {
            peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        });

        // 서버에서 ICE candidate 받기
        socketService.on('ice-candidate', (candidate) => {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        });

        // 마이크 스트림을 추가
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
            })
            .catch((error) => {
                console.error("Error accessing microphone", error);
            });

    }, []);

    return <div>음성 채널 연결 중...</div>;
};

export default VoiceChannel;