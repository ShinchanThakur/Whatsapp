const generateMessage = (username, text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    };
};

const generateLocationMessage = (username, googleMapsLink) => {
    return {
        username,
        googleMapsLink,
        createdAt: new Date().getTime()
    };
};

module.exports = {
    generateMessage,
    generateLocationMessage
}