
# Chappy-API

## Description
This is an API for a school-project. The task was to create an API to handle a simpler Chatapp
Listed below are Dependencies, Usage DOCS and examples that hopefully will guide any user.

The project was to build a simple chat-app with locked and unlocked channels with user-logins and guests.
Listed below is all the dependencies, usage docs and examples that hopefully will be enough to guide any user.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Examples](#examples)
- [Contributing](#Contributing)
- [License](#License)
- [Contact_Information](#Contact_Information)


## Installation
<a name="installation"></a>
Dependencies:

    
       "cors": "^2.8.5",
       "dotenv": "^16.1.4",
       "express": "^4.18.2",
       "jsonwebtoken": "^9.0.0",
       "lowdb": "^6.0.1",
       "react": "^18.2.0",
       "react-icons": "^4.9.0",
       "recoil": "^0.7.7"
       
       
## Usage
<a name="usage"></a>
The API is simple and is used is for handling data for a chatapp, it handles channels, channel-messages, login of users and adding new ones in the database. 




<br>
<br>

## API Documentation
<a name="api-documentation"></a>

## Channels
### 1.[GET]  /api/channels 
> Get all channels
### 2.[GET]  /api/channels/channelId
> Get individual channels 
### 3.[POST]  /api/channels/ 
> Request body 	{	name :} .
### 4.[DELETE] /api/channels/ChannelID 
> Remove a channel by calling the assigned ID.
### 5.[POST] api/channels/channelId/channelMessages  
> Request body { "author": "content": }
### 6.[DELETE] /api/channels/ChannelId/channelMessages/messageId 
> Remove a channel-message by calling the assigned ID.
### 7.[PUT] /api/channels/ChannelId/channelMessages/messageIUT
> Modify an existing channel-message. Request body { "author": "content": }


## Users
### 1.[GET] /api/users  
> Get all users.
### 2.[GET] /api/users/userId  
> Get individual user
### 3.[POST] /api/users/  
> Request body { name, password } 
### 4.[DELETE]  /Api/users/userId
> Remove a user by calling the assigned ID. 
### 5.[PUT] api/users/”userID” 
> Modify an existing user. Request body { name, password }


## Messages
### 1.[GET] /api/channelMessages  
> Get all messages from all channels.
### 2.[GET] /api/channelMessages/channelId  
> Get messages in specified channel
### 3.[POST] /api/channelMessages/channdelId  
> Request body { author, content } 
### 4.[DELETE]  /Api/channelMessages/channelId/messageId
> Remove a message by calling the channel by id and then the desired message by id. 


## Login
### 1.[POST] /login
> Request body { username, password } 


## Examples
<a name="examples"></a>
[GET] all Channels 

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
    
  <br>
    
[DELETE] a message

const deleteMessage = async (messageId) => {
try {
const response = await fetch('/api/channels/${channelId}/channelMessages/${messageId}',
        {
          method: 'DELETE',
        }
      );
            if (response.ok) {
        //filtrerar ut de id som inte matchar det valda och uppdaterar listan med de andra
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
  
  
[GET] all Users

  const handleGetUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      console.log("Fel vid hämtning av users");
    }
  };

<br>
<br>

## Contributing
If you encounter any issues with the API or have any feedback to improve its functionality, please don't hesitate to report them.


<br>

## License
<br>

¯\\_(ツ)_/¯ 

<br>

## Contact_Information

<br>
[https://github.com/RobinLarsson1]


