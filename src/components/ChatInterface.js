import React, { useState } from 'react';
import styles from './styles/ChatInterface.module.scss';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);  // 메시지 리스트 상태
    const [input, setInput] = useState('');        // 입력 필드 상태
    const [user, setUser] = useState('');          // 사용자 이름 상태
    const [userInput, setUserInput] = useState(''); // 사용자 이름 입력 필드 상태

    // 메시지 입력 핸들러
    const handleInput = event => {
        setInput(event.target.value);
    };

    // 사용자 이름 입력 핸들러
    const handleUserInput = event => {
        setUserInput(event.target.value);
    };

    // 메시지 전송 핸들러
    const sendMessage = () => {
        if (input.trim() && user.trim()) {
            setMessages([...messages, { user, text: input }]); // 메시지 객체에 사용자 이름과 텍스트 포함
            setInput(''); // 입력 필드 초기화
        }
    };

    // Enter 키로 메시지 전송
    const handleKeyPress = event => {
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
                                <strong>{message.user}:</strong> {message.text}
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
