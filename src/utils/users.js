const users = [];

const addUser = ({ id, username, room }) => {
    // Clean data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //Validate
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        };
    }

    //Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    });

    //Validate username
    if (existingUser) {
        return {
            error: 'Username already in use!'
        };
    }

    //Store user
    const user = { id, username, room };
    users.push(user);
    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        const deletedItem = users.splice(index, 1)[0];
        return deletedItem;
    }
};

module.exports = {
    addUser,
    removeUser
}