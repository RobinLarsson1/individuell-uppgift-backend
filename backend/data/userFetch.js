


const getUsers = async () => {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        return data
    } catch (error) {
        console.log('Error in fetching users');
    }
};

const deleteUser = async (userId, setErrorMessage, setUser) => {
    setErrorMessage('');
    try {
        const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        if (response.status === 200) {
            // user successfully deleted
            setUser((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } else if (response.status === 400) {
            // Invalid ID
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else if (response.status === 404) {
            // user not found
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else {
            // Other error occurred
            throw new Error('An error occurred while deleting the user');
        }
    } catch (error) {
        // Handle network or fetch error
        setErrorMessage(error.message);
        console.log('Error in removing user');
    }
};

const addUser = async (userName, userPassword, setErrorMessage, getUsers, setUser) => {
    setErrorMessage('');
    try {
        const response = await fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify({
                name: userName,
                password: userPassword,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            // user successfully added
            // Perform any necessary actions after adding the user
            getUsers();
        } else if (response.status === 400) {
            // Invalid request
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else if (response.status === 404) {
            // user not found
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else {
            // Other error occurred
            throw new Error('An error occurred while adding the user');
        }
    } catch (error) {
        // Handle network or fetch error
        setErrorMessage(error.message);
        console.log('Error in adding user');
    }
};

export { getUsers, deleteUser, addUser }