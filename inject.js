const injectScript = (file_path, type = "script", tag = "html") => {
  var node = document.getElementsByTagName(tag)[0];
  var tag_type = type == "link" ? "link" : "script";
  var script = document.createElement(tag_type);
  if (type == "script") {
    script.setAttribute("type", "text/javascript");
  } else if (type == "module") {
    script.setAttribute("type", "module");
  } else {
    script.setAttribute("rel", "stylesheet");
    script.setAttribute("media", "screen");
  }

  script.setAttribute(tag_type == "script" ? "src" : "href", file_path);

  node.appendChild(script);
};

/**
 * Using mutation observer to inject scripts when call start
 */
// Select the node that will be observed for mutations
const targetNode = document.body;
// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };
// Callback function to execute when mutations are observed
const callback = (mutationsList, observer) => {
  const element = document.querySelector(".d7iDfe");
  if (element === null) {
    injectScript(chrome.runtime.getURL("public/build/bundle.css"), "link", "head");
    injectScript(chrome.runtime.getURL("public/build/bundle.js"), "script", "html");
    observer.disconnect();
  }
};
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
// Start observing the target node for configured mutations
observer.observe(document.body, config);
