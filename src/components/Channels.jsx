import { useState, useEffect } from 'react'
import { addChannel, deleteChannel, getChannels } from '../../backend/data/channelFetch'
import Messages from './Messages'
import { useRecoilState } from "recoil"
import { isLoggedInState } from '../../backend/data/recoil';



function Channels() {
  const [channelName, setChannelName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [channel, setChannel] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]); // Ny state-variabel för meddelanden
  const [channelMessages, setChannelMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
  


  useEffect(() => {
    handleGetChannels()
  }, [])



  
  const handleGetChannels = async () => {
    try {
      const data = await getChannels();
      setChannel(data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      console.log('Error in fetching channels');
    }
  };


  const handleChannelClick = async (channelId, channelName) => {
    setSelectedChannel(channelId);
    try {
      const response = await fetch(`/api/channels/${channelId}`);
      if (response.ok) {
        const data = await response.json();
        setChannelMessages(data);
        if (channelName) {
          setChannelName(channelName); // Sätt kanalnamnet om det är definierat
        } else {
          setChannelName(''); // Återställ kanalnamnet till tom sträng om det är odefinierat
        }
        console.log(data);
      } else {
        throw new Error('Failed to fetch channel messages');
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <div>
      <hr />
      <div className='side-bar'>
        <section className='add-channel-section'>
          {/* <form action='submit' className='add-channel-form'>
            <input
              type='text'
              placeholder='Namn på ny kanal'
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <button type='submit' onClick={handleSubmitChannel}>
              Lägg till Kanal
            </button>
          </form> */}
        </section>
        <section className='show-channel-section'>
          <div>
            <h3>[Kanaler]:</h3>
          </div>
          {channel.map((channel) => (
            <div className='channel' key={channel.id} onClick={() => handleChannelClick(channel.id)}>
              <p onClick={() => setSelectedChannel(channel.id)}> #{channel.name}</p>
            </div>
          ))}
        </section>
        <br />
      </div>
      {selectedChannel && (

    <div>
          <h2>Aktuell kanal: {channelName}</h2>
          <Messages
            channelMessages={channelMessages}
            channelName={channelName}
            channelId={selectedChannel}
          />
        </div>
      )}

    </div>
  );
}


export default Channels


