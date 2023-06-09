const getMessages = async () => {
    try {
        const response = await fetch('api/messages');
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error when fetchiing messages')
    }
}

const deleteMessages = async (messageId, setErrormessage, setMessage) => {
    setErrormessage('')
    try {
        const response = await fetch(`/api/messages/${messageId}`, { method: 'DELETE' })
        if (response.status === 200) {
            setMessage((prevMessage) => prevMessage.filter((message) => message.id !== messageId))
        } else if (response.status == 400) {
            //ej hittat id
            const errorText = await response.text()
            setErrormessage(errorText)
        } else if (response.status === 404) {
            //ej hittad kanal 
            const errorText = await response.text()
            setErrormessage(errorText)
        } else {
            throw new Error('Error while deleting ')
        } 
    } catch (error) {
        setErrormessage(error.message)
        console.log('error')
    }
}

const addMessage = async (message)