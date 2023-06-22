import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil"
import { addNewUserState, isLoggedInState } from '../../backend/data/recoil';
import './styles/message.css'
import { AiOutlineUser, AiOutlineDelete } from 'react-icons/ai';
import { VscEdit } from 'react-icons/vsc';
import { BsSend } from 'react-icons/bs';



function Messages({ channelMessages, channelName, channelId }) {
  const [messages, setMessages] = useState(channelMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [wasEdited, setWasEdited] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
  const [loggedInUser, setLoggedInUser] = useRecoilState(addNewUserState);


  //kommer köras varje gång värdet i CM ändras
  useEffect(() => {
    setMessages(channelMessages);
  }, [channelMessages]);




  const createMessage = async () => {
    // Hindrar tomma meddelanden
    if (newMessage.trim() === '') {
      return;
    }
  
    // Bestäm författarnamn baserat på om användaren är inloggad eller inte
    const authorName = isLoggedIn ? loggedInUser.username : 'guest';
  
    const messageData = {
      author: authorName,
      content: newMessage,
    };
  
    try {
      const response = await fetch(`/api/channels/${channelId}/channelMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const newMessageId = data.id;
  
        // Skapar en ny array med de gamla meddelandena plus det nya och uppdaterar state
        const updatedChannelMessages = [
          ...messages,
          {
            id: newMessageId,
            author: messageData.author,
            content: messageData.content,
          },
        ];
        
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
    //är valt och inte tomt 
    if (!selectedMessage || newMessage.trim() === '') {
      return;
    }

    //om uppfyllt så skapas en ny lista med det nya meddelandet
    const updatedMessages = messages.map((message) =>
      message.id === selectedMessage.id ? { ...message, content: newMessage } : message
    );
    //skickas upp till apiet 
    try {
      const response = await fetch(
        //tar id för kanalen samt id för det meddelandet som ska ändras.
        `/api/channels/${channelId}/channelMessages/${selectedMessage.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: newMessage }),
        }
      );

      if (response.ok) {
        //uppdaterar listan med meddelanden med det nya värdet
        setMessages(updatedMessages);
        //tar bort merkering för valt meddelande
        setSelectedMessage(null);
        setNewMessage('');
      } else {
        console.log('Något gick fel vid uppdatering av meddelandet');
      }
    } catch (error) {
      console.log('Något gick fel', error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `/api/channels/${channelId}/channelMessages/${messageId}`,
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

  //tar emot meddelandet som blivit valt och uppdateras newMesssage med värdet från det gamla och gör det redigeringsbart
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
              <div className="message-content">
                <AiOutlineUser className="user-icon" />
                <div className="channel-msg-text">
                  <p className='author'>{message.author !== 'guest' ? message.author : 'guest'}:</p> <p>{message.content}</p> 
                </div>
                <div className="message-icons">
                  <VscEdit onClick={() => handleEditClick(message)} className='pen' />
                  <AiOutlineDelete onClick={() => deleteMessage(message.id)} className='trash' />
                </div>
              </div>
            </section>
          ))
        ) : (
          <p>Inga meddelanden</p>
        )}
      </section>
      <hr className='input-section-hr' />
      <section className='input-section'>
        <input
          type="text"
          className='message-input'
          placeholder="Send a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className='send-btn' onClick={handleSubmit}>{selectedMessage ? <VscEdit className='edit-msg' /> : <BsSend className='send-icon' />}</button>
      </section>
    </div>
  );
}

export default Messages;
