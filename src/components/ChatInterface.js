import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from './styles/ChatInterface.module.scss';
import { CHAT_URL } from '../config/host-config';
import defaultProfileImage from '../discodeImg.jpeg';
import { useSelector } from "react-redux";

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const messagesEndRef = useRef(null);
    const sessionToken = JSON.parse(sessionStorage.getItem('userData'));
    const currentGroup = useSelector(state => state.group.currentGroup);
    const teamId = currentGroup?.teamId;

    // WebSocket 연결 및 메시지 채팅방 가입
    useEffect(() => {
        if (!teamId) {
            console.log("teamId를 찾을 수 없습니다.");
            return;
        }

        const socket = new SockJS(`${CHAT_URL}`);
        const client = Stomp.over(socket);
        client.debug = () => {};

        client.connect({}, () => {
            if (stompClient) {
                stompClient.disconnect();
            }
            // 새 메시지가 수신될 때마다 메시지 상태 업데이트
            client.subscribe('/topic/public', (message) => {
                const receivedMessage = JSON.parse(message.body);

                // 메시지 수신 시 정렬
                setMessages((prevMessages) =>
                    [...prevMessages, receivedMessage]
                        .sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
                );
            });

            setStompClient(client);
        }, (error) => {
            console.error("WebSocket 연결 실패: ", error);
            setTimeout(() => client.connect(), 5000);
        });

        // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, [teamId]);

    // 초기 메시지 로드
    useEffect(() => {
        if (teamId && stompClient) {
            stompClient.send('/app/loadMessages', {}, JSON.stringify({ teamId }));

            stompClient.subscribe('/topic/public', (message) => {
                const receivedMessages = JSON.parse(message.body);

                // 불러온 메시지 정렬 후 저장
                const formattedMessages = receivedMessages.map((msg) => ({
                    ...msg,
                    createAt: new Date(msg.createAt).toISOString(),
                })).sort((a, b) => new Date(a.createAt) - new Date(b.createAt));

                setMessages(formattedMessages);
            });
        }
    }, [stompClient, teamId]);

    // 스크롤 하단 유지
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleInput = (event) => {
        setInput(event.target.value);
    };

    const formatDateForDisplay = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();

        // 오늘 날짜인지 확인
        const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();

        if (isToday) {
            // 시간 포맷 - 오늘일 경우
            const hours = date.getHours();
            const period = hours >= 12 ? '오후' : '오전';
            const hourIn12 = hours % 12 || 12;
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${period} ${hourIn12}:${minutes}`;
        } else {
            // 날짜와 시간 포맷 - 오늘이 아닐 경우
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const period = hours >= 12 ? '오후' : '오전';
            const hourIn12 = hours % 12 || 12;

            return `${year}-${month}-${day} ${period} ${hourIn12}:${minutes}`;
        }
    };


    const sendMessage = () => {
        if (input.trim() && stompClient && teamId) {
            const messageObject = {
                userId: sessionToken.userId,
                name: sessionToken.nickName,
                email: sessionToken.email,
                content: input,
                teamId: teamId,
                createAt: new Date().toISOString(),
            };

            stompClient.send('/app/sendMessage', {}, JSON.stringify(messageObject));
            setInput('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>
            {teamId ? (
                <>
                    <div className={styles.messagesList}>
                        {messages.map((message, index) => (
                            <div key={index} className={styles.message}>
                                <div className={styles.userEmoji}>
                                    <img src={defaultProfileImage} alt="프로필 이미지" className={styles.profileImage}/>
                                </div>
                                <div className={styles.messageDetails}>
                                    <div className={styles.userNameRow}>
                                        <div className={styles.userName}>{message.name}</div>
                                        <div className={styles.messageTime}>{formatDateForDisplay(message.createAt)}</div>
                                    </div>
                                    <div className={styles.messageContent}>{message.content}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            value={input}
                            onChange={handleInput}
                            onKeyPress={handleKeyPress}
                            className={styles.inputField}
                            placeholder="메시지 입력..."
                        />
                        <button onClick={sendMessage} className={styles.sendButton}>보내기</button>
                    </div>
                </>
            ) : (
                <p>팀 정보를 불러오는 중...</p>
            )}
        </div>
    );
};

export default ChatInterface;
