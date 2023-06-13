import { useState, useEffect } from 'react'
import { addChannel, deleteChannel, getChannels } from '../../backend/data/channelFetch'
import Messages from './Messages'
import { useRecoilState } from "recoil"
import { isLoggedInState } from '../../backend/data/recoil';
import './styles/channels.css'



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


  const getChannelName = (channelId) => {
    const selectedChannel = channel.find((channel) => channel.id === channelId);
    if (selectedChannel) {
      return selectedChannel.name;
    }
    return '';
  };
  
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
    if (isLoggedIn || [420, 92860].includes(channelId)) {
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
  }
  };


  
  return (
    <div className='channel-div'>
      <div className='side-bar'>
        <section className='show-channel-section'>
          <div>
            <h3>[Kanaler]:</h3>
          </div>
          {channel.map((channel) => (
  <div className="channel" key={channel.id} onClick={() => handleChannelClick(channel.id, channel.name)}>
    <p className='channel-name'>
      #{channel.name}
      {!isLoggedIn && [420, 92860].includes(channel.id)}
      {!isLoggedIn && [92861, 92864].includes(channel.id) && '🔒'}
      {isLoggedIn && [92861, 92864].includes(channel.id) && '🔑'}
    </p>
  </div>
))}
        </section>
        <br />
      </div>
      {selectedChannel && (

    <div className='channel-msg'>
         <h2 className='channel-name-h2'>{getChannelName(selectedChannel)}</h2>
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


