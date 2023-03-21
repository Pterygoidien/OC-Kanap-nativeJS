console.log('hello');

const urlParams = new URLSearchParams(window.location.search);
const firstName = urlParams.get("firstName");
console.log(firstName)