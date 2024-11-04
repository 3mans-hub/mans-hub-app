import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/host-config';

const useTurnCredentials = () => {
    const [credentials, setCredentials] = useState(null);

    const userData = JSON.parse(localStorage.getItem("userData")) || JSON.parse(sessionStorage.getItem("userData")) || {};
    console.log(userData.email)

    useEffect(() => {
        const fetchTurnCredentials = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/getTurnCredentials`, {
                    params: { username: `${userData.email}` }
                });
                setCredentials(response.data);
            } catch (error) {
                console.error('TURN 서버 연결 실패:', error.response ? error.response.data : error.message);
            }
        };

        fetchTurnCredentials();
    }, []);

    return credentials;
};

// 기본 내보내기 추가
export default useTurnCredentials;