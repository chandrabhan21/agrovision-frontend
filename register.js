document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    const existingMsg = document.querySelector(".register-msg");
    if (existingMsg) existingMsg.remove();

    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const container = document.querySelector(".container");
        const msg = document.createElement("p");
        msg.classList.add("register-msg");
        msg.style.fontWeight = "bold";

        if (response.ok) {
            msg.style.color = "lime";
            msg.innerText = "Registration successful! Redirecting to Login...";
            container.insertBefore(msg, container.firstChild);

            document.getElementById("registerForm").reset();

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2500);
        } else {
            msg.style.color = "red";
            msg.innerText = "Registration failed!";
            container.insertBefore(msg, container.firstChild);
        }
    } catch (err) {
        console.error(err);
        const container = document.querySelector(".container");
        const msg = document.createElement("p");
        msg.classList.add("register-msg");
        msg.style.color = "red";
        msg.style.fontWeight = "bold";
        msg.innerText = "Error connecting to server.";
        container.insertBefore(msg, container.firstChild);
    }
});
