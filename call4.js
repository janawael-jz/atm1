function login(username, callback) {
    console.log("Logging in...");

    setTimeout(function () {
        console.log("Login Successful");
        callback();
    }, 1000);
}

function goToHome() {
    console.log("Welcome! Redirecting to Home Page...");
}

login("Jana", goToHome);