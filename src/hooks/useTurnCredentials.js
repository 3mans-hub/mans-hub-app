import { useState, useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL} from "../config/host-config";

const useTurnCredentials = () => {
    const [credentials, setCredentials] = useState(null);

    useEffect(() => {
        const fetchTurnCredentials = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/getTurnCredentials`, {
                    params: { username: 'user1' }
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

export default useTurnCredentials;