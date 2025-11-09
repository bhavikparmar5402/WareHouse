import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url) => {
  const socketRef = useRef(null);
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io(url, { transports: ['websocket'] });
    const socket = socketRef.current;

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.close();
    };
  }, [url]);

  return { socket: socketRef.current, isConnected };
};

export default useSocket;
