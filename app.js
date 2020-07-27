// This script is being injected when a Google Meet is started
console.log('ChromeScrumExtension::CALL STARTED, WE CAN INIT APP')

// If we ever want the call meeting id to establish a websocket between attendants
const meetingID = document.querySelector("[data-unresolved-meeting-id]").getAttribute("data-unresolved-meeting-id");
console.log(`ChromeScrumExtension::Meeting ID = ${meetingID}`);

// Creating app (Simple test)
const app = document.createElement('div');
const button = document.createElement('button');
button.innerText = 'Débuter le scrum';
button.type = 'button';
button.addEventListener('click', () => {
    console.log('ChromeScrumExtension::Starting scrum');
    // const textarea = document.querySelector('textarea');
    // const button = document.querySelector('[jscontroller="VXdfxd"]');
    // console.log(textarea);
    // console.log(button);
    // if (textarea && button) {
    //     textarea.value = 'ChromeScrumExtension::Starting scrum';
    //     textarea.onchange();
        
    //     button.click();
    // }
})
app.appendChild(button);
app.id = 'chrome-scrum-extension';

// Appending app to current call
document.body.appendChild(app);