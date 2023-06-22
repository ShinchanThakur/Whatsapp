const socket = io();

//Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const $sidebar = document.querySelector('#sidebar');

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});

const autoScroll = () => {
    $messages.scrollTop = $messages.scrollHeight;
};

socket.on('message', ({ username, text, createdAt }) => {
    const messageHtml = Mustache.render(messageTemplate, {
        username,
        message: text,
        createdAt: moment(createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', messageHtml);
    autoScroll();
});

socket.on('locationMessage', ({ username, googleMapsLink, createdAt }) => {
    const locationMessageHtml = Mustache.render(locationMessageTemplate, {
        username,
        googleMapsLink,
        createdAt: moment(createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', locationMessageHtml);
    autoScroll();
});

socket.on('roomData', ({ room, users }) => {
    const roomDataHtml = Mustache.render(sidebarTemplate, {
        room,
        users
    });
    $sidebar.innerHTML = roomDataHtml;
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    const typedMessage = e.target.elements.message.value;
    socket.emit('sendMessage', typedMessage, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if (error) {
            return console.log(error);
        }
        console.log('Message delivered');
    });
});

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Your browser does not support Geolocation');
    }
    $sendLocationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location Shared');
        });
    });
});