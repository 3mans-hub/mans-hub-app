import { useEffect, useRef } from 'react';
import socketService from '../services/socketService';
import { createPeerConnection, getScreenShareStream } from '../services/webrtcService';

// WebRTC 설정 관리

const useWebRTC = (localVideoRef, remoteVideoRef) => {
    const peerConnectionRef = useRef(null);

    useEffect(() => {
        socketService.on('offer', async (offer) => {
            if (!peerConnectionRef.current) {
                peerConnectionRef.current = createPeerConnection(remoteVideoRef);
            }
            await peerConnectionRef.current.setRemoteDescription(offer);
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            socketService.sendAnswer(answer);
        });

        socketService.on('answer', async (answer) => {
            await peerConnectionRef.current.setRemoteDescription(answer);
        });

        socketService.on('ice-candidate', (candidate) => {
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