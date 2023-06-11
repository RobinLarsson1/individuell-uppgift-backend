import React, { useState } from 'react';

function Messages({ channelMessages, channelName, channelId }) {
  const [messages, setMessages] = useState(channelMessages);
  const [newMessage, setNewMessage] = useState('');
 

  const handleMessageSubmit = async () => {
    console.log(channelId);
    if (newMessage.trim() === '') {
      return; // Om meddelandet är tomt, avbryt
    }

    const messageData = {
      author: 'user-1',
      content: newMessage
    };

    try {
      if (!channelId) {
        console.log('channelId är undefined');
        return;
      }

      const response = await fetch(
        `http://localhost:3877/api/channels/${channelId}/channelMessages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(messageData)
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newMessageId = data.id;

        // Uppdatera kanalmeddelandena med det nya meddelandet
        const updatedChannelMessages = [
          ...channelMessages,
          {
            id: newMessageId,
            author: messageData.author,
            content: messageData.content,
            timestamp: new Date().toISOString()
          }
        ];

        // Uppdatera state för nya meddelandet och rensa textfältet
        setMessages(updatedChannelMessages);
        setNewMessage('');

		setChannelMessages(updatedChannelMessages);
      } else {
        console.log('Något gick fel');
      }
    } catch (error) {
      console.log('Något gick fel', error);
    }
  };

  

  return (
    <div className="chat-area">
      <section className="heading">
        Chattar i <span className="chat-name">{channelName}</span>
      </section>
      <section className="history">
        {channelMessages.length > 0 ? (
          channelMessages.map((message) => (
            <section key={message.id} className={message.author}>
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
