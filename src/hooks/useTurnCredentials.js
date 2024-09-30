import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 커스텀 훅: TURN 서버 자격 증명을 가져오는 역할
const useTurnCredentials = () => {
    const [credentials, setCredentials] = useState(null);

    useEffect(() => {
        // TURN 서버 자격 증명을 가져오는 비동기 함수
        const fetchTurnCredentials = async () => {
            try {
                // 백엔드의 '/api/getTurnCredentials' 엔드포인트에서 자격 증명 요청
                const response = await axios.get('/api/getTurnCredentials');
                // 자격 증명을 상태에 저장
                setCredentials(response.data);
            } catch (error) {
                console.error('TURN 서버 연결 실패', error);
            }
        };

        // 자격 증명을 가져오기 위해 fetchTurnCredentials 호출
        fetchTurnCredentials();
    }, []);

    return credentials;  // 가져온 자격 증명을 반환
};

// 비디오 채팅 컴포넌트
const VideoChatComponent = () => {
    // useTurnCredentials 훅을 사용하여 TURN 서버 자격 증명 가져오기
    const credentials = useTurnCredentials();

    useEffect(() => {
        // 자격 증명이 준비되었을 때 실행
        if (credentials) {
            // 피어 연결 설정
            const peerConnection = new RTCPeerConnection({
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },  // STUN 서버 설정
                    {
                        urls: 'turn:localhost:3478',  // TURN 서버 설정
                        username: credentials.username,  // 백엔드에서 가져온 사용자 이름
                        credential: credentials.credential,  // 백엔드에서 가져온 자격 증명(비밀번호)
                    },
                ],
            });

            // 이후 WebRTC 연결 설정 관련 작업을 진행
            // 예를 들어, offer/answer 교환, ICE candidate 처리, 미디어 스트림 추가 등
        }
    }, [credentials]);  // 자격 증명이 업데이트될 때마다 실행

    return (
        <div>
            {/* 비디오 화면 등 UI를 표시할 부분 */}
            <h2>비디오 채팅 컴포넌트</h2>
        </div>
    );
};

export default VideoChatComponent;