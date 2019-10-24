import { useEffect, useState } from 'react';

const useSocketSessionId = () => {
    
    const [socketSessionId, setSocketSessionId] = useState('');

    useEffect(() => {
        Sockets.setSessionId(mySessionId => {
            setSocketSessionId(mySessionId);
        });
    })

    return {
        socketSessionId,
    }
}

export default useSocketSessionId;