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
    //ALTERNATIVE
    //The alternative here could be using filter method
    //pro - It is simple to write (only 1 line of code)
    //con - It is less efficient (findIndex will stop looking after finding the first index, but filter will keep filtering till end of array)
};

const getUser = (id) => {
    const user = users.find((user) => user.id === id)
    return user;
};

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase();
    const roomUsers = users.filter((user) => user.room === room);
    return roomUsers;
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
};