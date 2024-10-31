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

        // connect = 서버에 연결할때 사용하는 메서드
        client.connect({}, () => {
            // console.log('Connected to WebSocket');

            // 새로운 팀에 연결할 때 채팅방을 초기화하고 메시지 중복 방지
            if (stompClient) {
                stompClient.disconnect();  // 이전 채팅방 해제
            }

            // 채팅방을 토픽/퍼블릭으로 진입
            client.subscribe('/topic/public', (message) => {
                const receivedMessage = JSON.parse(message.body);
                // console.log('Received message:', receivedMessage);  // 메시지 수신 확인
                // 이전메세지 불러오고 파싱된 메세지를 추가
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });

            // 채팅방에 로그인
            setStompClient(client);

        }, (error) => {
            console.error("WebSocket 연결 실패: ", error);
            setTimeout(() => client.connect(), 5000);  // 연결 실패 시 5초 후 재시도
        });

        return () => {
            // 팀 변경 시 이전 stompClient 구독을 해제하여 중복 방지
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, [teamId]);

    // 초기 메시지 로드
    useEffect(() => {
        if (teamId && stompClient) {
            stompClient.send('/app/loadMessages', {}, JSON.stringify({ teamId }));

            // 불러온 메시지의 날짜 형식이 올바른지 확인
            stompClient.subscribe('/topic/public', (message) => {
                const receivedMessages = JSON.parse(message.body);

                // 불러온 메시지마다 createAt 형식을 확인하여 올바르게 변환
                // 이거 ㅈ같은게 시간 타입때문에 메세지 못 불러와서 오래걸렸다.
                const formattedMessages = receivedMessages.map((msg) => {
                    return {
                        ...msg,
                        createAt: new Date(msg.createAt).toISOString(),  // ISO 형식으로 변환
                    };
                });
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
        // if (isNaN(date.getTime())) {
        //     console.warn("Invalid date format:", dateString);
        //     return "Invalid Date";
        // }

        // 로컬 시간으로 표시
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = hours >= 12 ? '오후' : '오전';
        const hourIn12 = hours % 12 || 12;

        return `${period} ${hourIn12}:${minutes}`;
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
