import React, { useEffect, useState } from 'react';
import socketService from "../services/socketService";
import useTurnCredentials from '../hooks/useTurnCredentials';

const VoiceChannel = () => {
    const credentials = useTurnCredentials();

    useEffect(() => {
        if (!credentials) return;

        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: `turn:localhost:3478`, username: credentials.username, credential: credentials.credential }
            ],
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socketService.stompClient.publish({
                    destination: '/app/ice-candidate',
                    body: JSON.stringify(event.candidate),
                });
            }
        };

        peerConnection.ontrack = ({ streams: [stream] }) => {
            const audioElement = document.createElement('audio');
            audioElement.srcObject = stream;
            audioElement.autoplay = true;
            document.body.appendChild(audioElement);
        };

        socketService.stompClient.subscribe('/topic/offer', async (offerMessage) => {
            const offer = JSON.parse(offerMessage.body);
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socketService.stompClient.publish({
                destination: '/app/answer',
                body: JSON.stringify(answer),
            });
        });

        socketService.stompClient.subscribe('/topic/answer', (answerMessage) => {
            const answer = JSON.parse(answerMessage.body);
            peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socketService.stompClient.subscribe('/topic/ice-candidate', (candidateMessage) => {
            const candidate = JSON.parse(candidateMessage.body);
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        });

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
            })
            .catch((error) => {
                console.error("Error accessing microphone", error);
            });

    }, [credentials]);

    return <div>음성 채널에 연결되었습니다!</div>;
};

export default VoiceChannel;