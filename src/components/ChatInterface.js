import React, { useState } from 'react';
import styles from './styles/ChatInterface.module.scss';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleInput = event => {
        setInput(event.target.value);
    };

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messagesList}>
                {messages.map((message, index) => (
                    <div key={index} className={styles.message}>
                        {message}
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
        </div>
    );
};

export default ChatInterface;
