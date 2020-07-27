// This script is being injected when a Google Meet is started
console.log('ChromeScrumExtension::CALL STARTED, WE CAN INIT APP')

// If we ever want the call meeting id to establish a websocket between attendants
const meetingID = document.querySelector("[data-unresolved-meeting-id]").getAttribute("data-unresolved-meeting-id");
console.log(`ChromeScrumExtension::Meeting ID = ${meetingID}`);

// Very basic to test buttons
let isStarted = false;

// Creating app (Simple test)
const app = document.createElement('div');
const button = document.createElement('button');
button.innerText = 'Débuter le scrum';
button.type = 'button';
button.addEventListener('click', () => {
    isStarted = !isStarted;
    if (isStarted) {
        console.log('ChromeScrumExtension::Starting scrum');
        button.innerText = '⏸️';
    } else {
        console.log('ChromeScrumExtension::Pausing scrum');
        button.innerText = '▶️';
    }
})
app.appendChild(button);
app.id = 'chrome-scrum-extension';

// Appending app to current call
document.body.appendChild(app);