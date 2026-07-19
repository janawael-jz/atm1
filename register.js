function registerUser(name, email) {
    return new Promise((resolve, reject) => {

        // Check if name and email exist
        if (!name || !email) {
            reject("Name and email are required.");
        } else {

            // Simulate sending verification email
            setTimeout(() => {
                resolve("Verification email sent successfully!");
            }, 2000);

        }
    });
}

async function register() {
    try {
        const message = await registerUser("Jana", "jana@example.com");

        console.log(message);
        console.log("Registration completed successfully!");

    } catch (error) {
        console.error(error);
    }
}

register();