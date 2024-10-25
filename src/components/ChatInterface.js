import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from './styles/ChatInterface.module.scss';
import { CHAT_URL } from '../config/host-config';
import defaultProfileImage from '../discodeImg.jpeg';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const messagesEndRef = useRef(null);
    const sessionToken = JSON.parse(sessionStorage.getItem('userData'));

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
                const userNickname = typeof receivedMessage.user === 'object'
                    ? receivedMessage.user.name
                    : receivedMessage.user;

                setMessages((prevMessages) => [...prevMessages, { ...receivedMessage, user: userNickname }]);
            });

            setStompClient(client);
        });

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInput = (event) => {
        setInput(event.target.value);
    };

    const formatDateForDisplay = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = hours >= 12 ? '오후' : '오전';
        const hourIn12 = hours % 12 || 12;
        return `${period} ${hourIn12}:${minutes}`;
    };

    const sendMessage = () => {
        if (input.trim() && stompClient) {
            const messageObject = {
                userId: sessionToken.userId,
                name: sessionToken.nickName,
                email: sessionToken.email,
                content: input,
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
        </div>
    );
};

export default ChatInterface;
