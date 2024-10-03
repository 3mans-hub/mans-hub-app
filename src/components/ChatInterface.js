import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from './styles/ChatInterface.module.scss';
import {CHAT_URL} from '../config/host-config'

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);  // 메시지 리스트 상태
    const [input, setInput] = useState('');        // 메시지 입력 필드 상태
    const [user, setUser] = useState('');          // 사용자 이름 상태
    const [userInput, setUserInput] = useState(''); // 사용자 이름 입력 필드 상태
    const [stompClient, setStompClient] = useState(null);  // STOMP 클라이언트 상태

    // 시작할때 localhost:6969/chat-websocket 들어가서 stomp 로그인 해야함
    useEffect(() => {
        const socket = new SockJS(`${CHAT_URL}`);
        const client = Stomp.over(socket);

        client.connect({}, () => {
            console.log('Connected to WebSocket');

            // 메시지 수신 시 호출되는 구독 경로 설정
            client.subscribe('/topic/public', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
            });

            setStompClient(client); // STOMP 클라이언트 설정
        });

        return () => {
            if (client) client.disconnect();
        };
    }, []);

    // 메시지 입력 핸들러
    const handleInput = (event) => {
        setInput(event.target.value);
    };

    // 사용자 이름 입력 핸들러
    const handleUserInput = (event) => {
        setUserInput(event.target.value);
    };

    const formatDateForDisplay = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');  // 분 추가
        const period = hours >= 12 ? '오후' : '오전';
        const hourIn12 = hours % 12 || 12;  // 0시는 12시로 처리
        const formattedDate =
            `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} 
            ${period} ${hourIn12}:${minutes}
            `;
        return formattedDate;
    };

    // 메시지 전송 핸들러
    const sendMessage = () => {
        if (input.trim() && user.trim() && stompClient) {
            const today = new Date();
            const formattedDate = today.getFullYear() + '-' +
                String(today.getMonth() + 1).padStart(2, '0') + '-' +
                String(today.getDate()).padStart(2, '0') + 'T' +
                String(today.getHours()).padStart(2, '0') + ':' +
                String(today.getMinutes()).padStart(2, '0') + ':' +
                String(today.getSeconds()).padStart(2, '0');

            const messageObject = {
                user: user,
                content: input,
                createAt: formattedDate
            };

            console.log("Sending message: ", messageObject);
            stompClient.send('/app/sendMessage', {}, JSON.stringify(messageObject));
            setInput('');
        }
    };


    // Enter 키로 메시지 전송
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    // 사용자 이름 저장
    const handleUserSubmit = () => {
        if (userInput.trim()) {
            setUser(userInput);
        }
    };

    return (
        <div className={styles.chatContainer}>
            {!user ? (
                <div className={styles.userInputArea}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleUserInput}
                        className={styles.inputField}
                        placeholder="사용자 이름 입력..."
                    />
                    <button onClick={handleUserSubmit} className={styles.sendButton}>
                        이름 저장
                    </button>
                </div>
            ) : (
                <>
                    <div className={styles.messagesList}>
                        {messages.map((message, index) => (
                            <div key={index} className={styles.message}>
                                <div className={styles.messageTime}>{formatDateForDisplay(message.createAt)}</div>
                                <div className={styles.messageContent}>{message.content}</div>
                            </div>
                        ))}
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
            )}
        </div>
    );
};

export default ChatInterface;
