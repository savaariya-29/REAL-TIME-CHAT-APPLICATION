import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', message);
        setMessage('');
    };

    useEffect(() => {
        socket.on('receiveMessage', (msg) => {
            setChat([...chat, msg]);
        });
        return () => socket.off('receiveMessage');
    }, [chat]);

    return (
        <div className="App">
            <h1>Real-Time Chat</h1>
            <div>
                {chat.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default App;
