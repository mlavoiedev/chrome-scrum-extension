const log = (message) => {
    console.log(`🕒 ChromeScrumExtension :: ${message}`);
}   

// This script is being injected when a Google Meet is started
log('Meet Call started, initing app')

const getUsers = () => {
    const  elements = document.querySelectorAll('[data-participant-id]');
    
    const users = Array.from(elements).map(element => {
        const innerText = element.innerText;

        // Removing everything before new line
        const string = innerText.substring(innerText.indexOf("\n") + 1);

        // Formatting firstName and lastName
        const fullName = string.split(' ');
        const firstName = fullName[0];
        const lastName = fullName[1] ? ` ${fullName[1][0].toUpperCase()}` : ''

        return `${firstName}${lastName}`;
     });

    log(`Users = ${users.join(', ')}`);
}

// If we ever want the call meeting id to establish a websocket between attendants
const meetingID = document.querySelector("[data-unresolved-meeting-id]").getAttribute("data-unresolved-meeting-id");
log(`Meeting ID = ${meetingID}`);

// Very basic to test buttons
let isStarted = false;

// Creating app (Simple test)
const app = document.createElement('div');
const button = document.createElement('button');
button.innerText = 'Débuter le scrum';
button.type = 'button';
button.addEventListener('click', () => {
    getUsers();
    isStarted = !isStarted;
    if (isStarted) {
        log('Starting scrum');
        button.innerText = '⏸️';
    } else {
        log('Pausing scrum');
        button.innerText = '▶️';
    }
})
app.appendChild(button);
app.id = 'chrome-scrum-extension';

// Appending app to current call
document.body.appendChild(app);