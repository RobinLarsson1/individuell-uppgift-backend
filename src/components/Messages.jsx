import React, { useState, useEffect } from 'react';

function Messages({ channelMessages, channelName, channelId }) {
  const [messages, setMessages] = useState(channelMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [wasEdited, setWasEdited] = useState(false)


  //kommer köras varje gång värdet i CM ändras
  useEffect(() => {
    setMessages(channelMessages);
  }, [channelMessages]);

  const createMessage = async () => {
    
    //hindrar tomma meddelanden
    if (newMessage.trim() === '') {
      return;
    }


    const messageData = {
      author: 'user-1',
      content: newMessage,
    };

    try {
      const response = await fetch(
        `http://localhost:3877/api/channels/${channelId}/channelMessages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newMessageId = data.id;


        //här skapar jag ny array med de gamla meddelanden + det nya och skickar tillbaka det
        const updatedChannelMessages = [
          ...messages,
          {
            id: newMessageId,
            author: messageData.author,
            content: messageData.content,
          },
        ];

        //uppdateras messages med det nya
        setMessages(updatedChannelMessages);
        setNewMessage('');
      } else {
        console.log('Något gick fel');
      }
    } catch (error) {
      console.log('Något gick fel', error);
    }
  };

  const updateMessage = async () => {

    //kontrollerar först så att det en medelande är valt och om det är tomt
    if (!selectedMessage || newMessage.trim() === '') {
      return;
    }

    //annars så kopierar jag gamla listan med det nya värder
    const updatedMessages = messages.map((message) =>
      message.id === selectedMessage.id ? { ...message, content: newMessage } : message
    );
    setMessages(updatedMessages);
    setSelectedMessage(null);
    setNewMessage('');
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `http://localhost:3877/api/channels/${channelId}/channelMessages/${messageId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        const updatedMessages = messages.filter((message) => message.id !== messageId);
        setMessages(updatedMessages);
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage(null);
        }
      } else {
        console.log('Något gick fel vid radering av meddelandet');
      }
    } catch (error) {
      console.log('Något gick fel', error);
    }
  };

  //tar emot meddelandet som blivit valt och uppdateras newMesssage med värdet från det gamla och gör det redigferingsbart
  const handleEditClick = (message) => {
    setSelectedMessage(message);
    setNewMessage(message.content);
  };



  const handleSubmit = () => {
    //om gammalt meddelande är valt så körs update, annars create
    if (selectedMessage) {
      updateMessage();
    } else {
      createMessage();
    }
  };

  return (
    <div className="chat-area">
      {/* ... */}
      <section className="history">
        {messages.length > 0 ? (
          messages.map((message) => (
            <section key={message.id} className={message.author}>
              <p>
                {message.author}: {message.content}
              </p>
              <button onClick={() => handleEditClick(message)}>Edit</button>
              <button onClick={() => deleteMessage(message.id)}>Delete</button>
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
        <button onClick={handleSubmit}>{selectedMessage ? 'Update' : 'Skicka'}</button>
      </section>
    </div>
  );
}

export default Messages;
