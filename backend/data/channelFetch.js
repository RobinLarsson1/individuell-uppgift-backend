
const getChannels = async () => {
    try {
        const response = await fetch('/api/channels');
        const data = await response.json();
        return data
    } catch (error) {
        console.log('Error in fetching channels');
    }
};

const deleteChannel = async (channelId, setErrorMessage, setChannel) => {
    setErrorMessage('');
    try {
        const response = await fetch(`/api/channels/${channelId}`, { method: 'DELETE' });
        if (response.status === 200) {
            // Channel successfully deleted
            setChannel((prevChannels) => prevChannels.filter((channel) => channel.id !== channelId));
        } else if (response.status === 400) {
            // Invalid ID
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else if (response.status === 404) {
            // Channel not found
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else {
            // Other error occurred
            throw new Error('An error occurred while deleting the channel');
        }
    } catch (error) {
        // Handle network or fetch error
        setErrorMessage(error.message);
        console.log('Error in removing channel');
    }
};

const addChannel = async (channelName, setErrorMessage, getChannels, setChannel) => {
    setErrorMessage('');
    try {
        const response = await fetch(`/api/channels`, {
            method: 'POST',
            body: JSON.stringify({
                name: channelName,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            // Channel successfully added
            // Perform any necessary actions after adding the channel
            getChannels();
        } else if (response.status === 400) {
            // Invalid request
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else if (response.status === 404) {
            // Channel not found
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else {
            // Other error occurred
            throw new Error('An error occurred while adding the channel');
        }
    } catch (error) {
        // Handle network or fetch error
        setErrorMessage(error.message);
        console.log('Error in adding channel');
    }
};






export { getChannels, deleteChannel, addChannel }