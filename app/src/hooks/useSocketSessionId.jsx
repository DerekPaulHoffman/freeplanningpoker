import { useEffect, useState } from 'react';

import * as Sockets from '../utilities/api.js';

const useSocketID = () => {
    
    const [socketID, setSocketID] = useState('');

    useEffect(() => {
        Sockets.setID(myID => {
            setSocketID(myID);
        });
    })

    return {
        socketID,
    }
}

export default useSocketID;