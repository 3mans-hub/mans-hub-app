import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from './styles/ChatInterface.module.scss';
import { CHAT_URL } from '../config/host-config';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [user, setUser] = useState('');
    const [userInput, setUserInput] = useState('');
    const [stompClient, setStompClient] = useState(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    useEffect(() => {
        const socket = new SockJS(`${CHAT_URL}`);
        const client = Stomp.over(socket);

        client.connect({}, () => {
            console.log('Connected to WebSocket');
            client.subscribe('/topic/public', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
            });

            setStompClient(client);
        });

        return () => {
            if (client) client.disconnect();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInput = (event) => {
        setInput(event.target.value);
    };

    const handleUserInput = (event) => {
        setUserInput(event.target.value);
    };

    const formatDateForDisplay = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = hours >= 12 ? '오후' : '오전';
        const hourIn12 = hours % 12 || 12;
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${period} ${hourIn12}:${minutes}`;
        return formattedDate;
    };

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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

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
                                <div className={styles.messageInfo}>
                                    <div className={styles.userEmoji}>
                                        😀
                                    </div>
                                    <div className={styles.messageDetails}>
                                        <div className={styles.messageTime}>{formatDateForDisplay(message.createAt)}</div>
                                        <div className={styles.messageContent}>{message.content}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} /> {/* 스크롤을 위한 참조 */}
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
