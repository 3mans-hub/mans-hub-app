import { useState, useEffect } from 'react';
import axios from 'axios';

const useTurnCredentials = () => {
    const [credentials, setCredentials] = useState(null);

    useEffect(() => {
        const fetchTurnCredentials = async () => {
            try {
                const response = await axios.get('http://localhost:6969/api/getTurnCredentials', {
                    params: { username: '유저1' } // 적절한 username을 여기서 전달해야 함
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