import { useEffect, useRef } from 'react';
import socketService from '../services/socketService';
import { createPeerConnection, getScreenShareStream } from '../services/webrtcService';

const useWebRTC = (localVideoRef, remoteVideoRef) => {
    const peerConnectionRef = useRef(null);

    useEffect(() => {
        socketService.connect(() => {
            console.log("Connected to STOMP server");
        });

        // STOMP 메시지 수신을 위한 구독 설정
        socketService.stompClient.subscribe('/topic/offer', async (message) => {
            const offer = JSON.parse(message.body);
            if (!peerConnectionRef.current) {
                peerConnectionRef.current = createPeerConnection(remoteVideoRef);
            }
            await peerConnectionRef.current.setRemoteDescription(offer);
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            socketService.sendAnswer(answer);
        });

        socketService.stompClient.subscribe('/topic/answer', async (message) => {
            const answer = JSON.parse(message.body);
            await peerConnectionRef.current.setRemoteDescription(answer);
        });

        socketService.stompClient.subscribe('/topic/ice-candidate', (message) => {
            const candidate = JSON.parse(message.body);
            peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        });
    }, []);

    const startCall = async () => {
        if (!peerConnectionRef.current) {
            peerConnectionRef.current = createPeerConnection(remoteVideoRef);
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach((track) => {
            peerConnectionRef.current.addTrack(track, stream);
        });

        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socketService.sendOffer(offer);
    };

    const handleScreenShare = async () => {
        const screenStream = await getScreenShareStream();
        screenStream.getTracks().forEach((track) => {
            peerConnectionRef.current.addTrack(track, screenStream);
        });
    };

    return { startCall, handleScreenShare };
};

export default useWebRTC;