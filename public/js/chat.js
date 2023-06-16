const socket = io();

//Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');

socket.on('message', (message) => {
    console.log(message);
});

socket.on('locationMessage', (googleMapsLink) => {
    console.log(googleMapsLink);
})

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