import { useEffect, useState } from 'react';

import * as Sockets from '../../utilities/api.js';

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