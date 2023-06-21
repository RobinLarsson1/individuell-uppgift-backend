import { useState, useEffect } from 'react';
import { addChannel, deleteChannel, getChannels } from '../../backend/data/channelFetch';
import Messages from './Messages';
import { useRecoilState } from 'recoil';
import './styles/channels.css';
import Users from './Users';
import { isLoggedInState, selectChannelState } from '../../backend/data/recoil';


const localStorageKey = 'jwt-key';

function Channels() {
  const [channelName, setChannelName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [channel, setChannel] = useState([]);
  const [selectedChannel, setSelectedChannel] = useRecoilState(selectChannelState);
  const [channelMessages, setChannelMessages] = useState([]);
  const [lockedMessage, setLockedMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)

  useEffect(() => {
    handleGetChannels();
  }, []);

  useEffect(() => {
    return () => {
      setSelectedChannel(null);
      setChannelMessages([]);
    };
  }, []);

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
    setSelectedChannel(channelId);
    try {
      const token = localStorage.getItem(localStorageKey);
      const headers = {
        'Content-Type': 'application/json'
      };

      // Kontrollera om kanalen är låst och om en giltig JWT-token finns
      const selectedChannel = channel.find((channel) => channel.id === channelId);
      if (selectedChannel.locked === 'true' && !token) {
        setLockedMessage('Kanalen är låst. Du måste logga in för att visa meddelanden.');
        return;
      }

      // Om en giltig JWT-token finns, lägg till token i begäran
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/channels/${channelId}`, { headers });
      if (response.ok) {
        const data = await response.json();
        setChannelMessages(data);
        if (channelName) {
          setChannelName(channelName);
        } else {
          setChannelName('');
        }
        setLockedMessage('');
      } else {
        throw new Error('Failed to fetch channel messages');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='channel-div'>
      <div className='side-bar'>
        <section className='show-channel-section'>
          <div>
            <h3 className='kanaler'>CHANNELS:</h3>
          </div>
          {channel.map((channel) => (
  <div
    className="channel"
    key={channel.id}
    onClick={() => handleChannelClick(channel.id, channel.name)}
  >
    <p className='channel-name'>
    #{channel.name} {channel.locked === 'true' && !isLoggedIn ? '🔒' : null}

    </p>
  </div>
))}
        </section>
        <Users />
        <br />
      </div>
      {selectedChannel && (
        <div className='channel-msg'>
          {lockedMessage ? (
            <h2>{lockedMessage}</h2>
          ) : (
            <>
              <h2 className='channel-name-h2'>{getChannelName(selectedChannel)}</h2>
              <Messages channelMessages={channelMessages} channelName={channelName} channelId={selectedChannel} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Channels;
