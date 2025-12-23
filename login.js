document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Remove previous message
    const existingMsg = document.querySelector(".login-msg");
    if (existingMsg) existingMsg.remove();

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const container = document.querySelector(".container");
        const msg = document.createElement("p");
        msg.classList.add("login-msg");
        msg.style.fontWeight = "bold";

        if (response.ok) {
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("username", username);

            msg.style.color = "lime";
            msg.innerText = "Login successful! Redirecting to Home...";
            container.insertBefore(msg, container.firstChild);

            window.location.href = "home.html";
        } else {
            let resultText = "Invalid credentials";
            try {
                const result = await response.json();
                resultText = result.message || resultText;
            } catch {}

            msg.style.color = "red";
            msg.innerText = "Login failed: " + resultText;
            container.insertBefore(msg, container.firstChild);
        }
    } catch (err) {
        console.error(err);
        const container = document.querySelector(".container");
        const msg = document.createElement("p");
        msg.classList.add("login-msg");
        msg.style.color = "red";
        msg.style.fontWeight = "bold";
        msg.innerText = "Error connecting to server.";
        container.insertBefore(msg, container.firstChild);
    }
});
