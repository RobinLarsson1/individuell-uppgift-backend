import React, { useState } from 'react';

function Messages({ channelMessages }) {
  const [newMessage, setNewMessage] = useState('');

  const handleMessageSubmit = async () => {
    if (newMessage.trim() === '') {
      return; // Om meddelandet är tomt, avbryt
    }


  };

  return (
    <div className="chat-area">
      <section className="heading">
        Chattar i <span className="chat-name">#grupp2</span>
      </section>
      <section className="history">
        {channelMessages.length > 0 ? (
          channelMessages.map((message) => (
            <section
              key={message.id}
              className={message.author === 'VänligaVera' ? 'align-right' : ''}
            >
              <p>
                {message.author}: {message.content}
              </p>
              <p>{message.timestamp}</p>
            </section>
          ))
        ) : (
          <p>Inga meddelanden</p>
        )}
      </section>
      <section>
        <input
          type="text"
          placeholder="Ditt meddelande..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleMessageSubmit}>Skicka</button>
      </section>
    </div>
  );
}

export default Messages;
