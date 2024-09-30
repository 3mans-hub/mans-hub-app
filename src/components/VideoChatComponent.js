import React, { useRef } from 'react';
import useWebRTC from '../hooks/useWebRTC';

const VideoChatComponent = () => {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    const { startCall, handleScreenShare } = useWebRTC(localVideoRef, remoteVideoRef);

    return (
        <div>
            <h1>Video Chat</h1>
            <div>
                <video ref={localVideoRef} autoPlay playsInline muted />
                <video ref={remoteVideoRef} autoPlay playsInline />
            </div>
            <button onClick={startCall}>Start Call</button>
            <button onClick={handleScreenShare}>Share Screen</button>
        </div>
    );
};

export default VideoChatComponent;