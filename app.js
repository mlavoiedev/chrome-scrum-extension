const log = (message) => {
  console.log(`🕒 ChromeScrumExtension :: ${message}`);
};

// This script is being injected when a Google Meet is started
log("Meet Call started, initializing app");

/**
 * This will get all users when Google Meet right pannel is opened
 */
const getUsers = () => {
  const elements = document.querySelectorAll("[data-participant-id]");

  const users = Array.from(elements).map((element) => {
    const innerText = element.innerText;

    // Removing everything before new line
    const string = innerText
      .substring(innerText.indexOf("\n") + 1)
      .replace("You", "");

    // Formatting firstName and lastName
    const fullName = string.split(" ");
    const firstName = fullName[0];
    const lastName = fullName[1] ? ` ${fullName[1][0].toUpperCase()}` : "";

    const image = element.querySelector("img");

    return {
      id: element.getAttribute("data-participant-id"),
      name: `${firstName}${lastName}`,
      imageURL: image ? image.src : "",
    };
  });

  return users;
};

// If we ever want the call meeting id to establish a websocket between attendants
const meetingID = document
  .querySelector("[data-unresolved-meeting-id]")
  .getAttribute("data-unresolved-meeting-id");
log(`Meeting ID = ${meetingID}`);

const createApp = (users) => {
  // Very basic to test buttons
  let isStarted = false;
  let currentUserIndex = 0;

  // Creating app (Simple test)
  const app = document.createElement("div");

  // Adding timer
  const timerDisplay = document.createElement("div");
  timerDisplay.innerText = `00:00`;

  // Adding current user
  const currentUser = document.createElement("div");
  currentUser.classList.add('current-user');
  const currentUserName = document.createElement("p");
  const currentUserImage = document.createElement("img");
  currentUserImage.src = users[currentUserIndex].imageURL;
  currentUserName.innerText = users[currentUserIndex].name;
  currentUser.appendChild(currentUserImage);
  currentUser.appendChild(currentUserName);


  // Creating nextButton
  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.innerText = "⏭️";
  nextButton.addEventListener('click', () => {
    currentUserIndex = currentUserIndex + 1 === users.length ? 0 : currentUserIndex + 1;
    currentUserImage.src = users[currentUserIndex].imageURL;
    currentUserName.innerText = users[currentUserIndex].name;
  })

  // Creating playPauseButton
  const playPauseButton = document.createElement("button");
  const onPlay = () => {
    log("Starting scrum");
    playPauseButton.innerText = "⏸️";
  };
  const onPause = () => {
    log("Pausing scrum");
    playPauseButton.innerText = "▶️";
  };
  playPauseButton.innerText = "▶️";
  playPauseButton.type = "button";
  playPauseButton.addEventListener("click", () => {
    console.log(users);
    isStarted = !isStarted;
    if (isStarted) {
      onPlay();
    } else {
      onPause();
    }
  });

  // Appending app childs
  app.appendChild(playPauseButton);
  app.appendChild(currentUser);
  app.appendChild(timerDisplay);
  app.appendChild(nextButton);
  app.id = "chrome-scrum-extension";

  // Appending app to current call
  document.body.appendChild(app);
};

/**
 * Using mutation observer to init app when participants are found
 */

// Select the node that will be observed for mutations
const targetNode = document.body;
// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };
// Callback function to execute when mutations are observed
const onMutation = (mutationsList, observer) => {
  // Use traditional 'for loops' for IE 11
  // for (let mutation of mutationsList) {
    const elements = document.querySelectorAll("[data-participant-id]");
    if (elements.length) {
      observer.disconnect();

      // TODO : 
      // replace setTimeout hack with something 
      // like store.dispatch('addUser')
      // when founding new user
      setTimeout(() => {
        log("Participant found, initializing extension");
        const users = getUsers();
        createApp(users);
      }, 1000);
    }
  // }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(onMutation);
// Start observing the target node for configured mutations
observer.observe(document.body, config);
