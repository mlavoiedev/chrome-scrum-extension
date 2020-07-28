import App from "./App.svelte";

const appElement = document.createElement("div");
appElement.id = "chrome-scrum-extension";
document.body.appendChild(appElement);

var app = new App({
  target: appElement,
});

export default app;
