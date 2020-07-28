/**
 * This will get all users when Google Meet right pannel is opened
 */
export const getUserFromNode = (element) => {
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
};
