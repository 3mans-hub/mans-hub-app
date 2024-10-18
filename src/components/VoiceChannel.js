import React, { useEffect } from 'react';
import socketService from "../services/socketService";

const VoiceChannel = () => {
    useEffect(() => {
        // WebRTC RTCPeerConnection 생성
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },  // STUN 서버
                { urls: 'turn:localhost:3478', username: 'generated-username', credential: 'generated-credential' }  // TURN 서버
            ],
        });

        // ICE 후보 생성 및 서버로 전송
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("ICE Candidate 생성됨:", event.candidate);
                // ICE 후보를 서버로 전송
                socketService.stompClient.publish({
                    destination: '/app/ice-candidate',
                    body: JSON.stringify(event.candidate)
                });
            } else {
                console.log("ICE Candidate 생성 완료");
            }
        };

        // 상대방의 미디어 스트림 수신
        peerConnection.ontrack = ({ streams: [stream] }) => {
            console.log("상대방의 미디어 스트림 수신됨", stream);
            const audioElement = document.createElement('audio');
            audioElement.srcObject = stream;
            audioElement.autoplay = true;
            document.body.appendChild(audioElement);
        };

        // 서버에서 offer 받기
        socketService.stompClient.onConnect = () => {
            socketService.stompClient.subscribe('/topic/offer', async (offerMessage) => {
                const offer = JSON.parse(offerMessage.body);
                console.log('Offer 수신됨: ', offer);
                await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                socketService.stompClient.publish({
                    destination: '/app/answer',
                    body: JSON.stringify(answer)
                });
            });

            // 서버에서 answer 받기
            socketService.stompClient.subscribe('/topic/answer', (answerMessage) => {
                const answer = JSON.parse(answerMessage.body);
                console.log('Answer 수신됨: ', answer);
                peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            });

            // 서버에서 ICE candidate 받기
            socketService.stompClient.subscribe('/topic/ice-candidate', (candidateMessage) => {
                const candidate = JSON.parse(candidateMessage.body);
                console.log('ICE Candidate 수신됨: ', candidate);
                peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            });
        };

        // 마이크 스트림 추가
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
            })
            .catch((error) => {
                console.error("마이크 접근 실패", error);
            });

    }, []);

    return <div>음성 채널 연결 중...</div>;
};

export default VoiceChannel;