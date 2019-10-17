import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

// Import the 
import * as Sockets from './utilities/api.js';
// Styles
import './styles/App.scss';

const App: React.FC = () => {
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
		Sockets.socketInit((err: string, timestamp: React.SetStateAction<number>) => {
      setTimestamp(timestamp);
    });
  }, [timestamp]);

  return (
    <div className="App">
      <header className="App-header">
        {timestamp}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
