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

    // 메시지 전송 핸들러
    const sendMessage = () => {
        if (input.trim() && user.trim() && stompClient) {
            const messageObject = {
                user: user,  // 사용자 이름 나중에 user 를 name 으로 바꾸면 됨
                content: input
            };

            console.log("Sending message: ", messageObject); // 메시지 확인
            stompClient.send('/app/sendMessage', {}, JSON.stringify(messageObject));
            setInput(''); // 입력 필드 초기화
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
                                <strong>{message.name}:</strong> {message.content}
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
