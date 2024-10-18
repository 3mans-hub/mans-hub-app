import { useState, useEffect } from 'react';
import axios from 'axios';

const useTurnCredentials = () => {
    const [credentials, setCredentials] = useState(null);

    useEffect(() => {
        const fetchTurnCredentials = async () => {
            try {
                const response = await axios.get('http://localhost:6969/api/getTurnCredentials', {
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