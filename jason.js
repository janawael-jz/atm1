async function getUser() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("User not found.");
        }

        // Convert response to JSON
        const user = await response.json();

        // Display user information
        console.log("Name:", user.name);
        console.log("Email:", user.email);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Call the function
getUser();