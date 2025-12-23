document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");
    const navLinks = document.querySelectorAll(".navbar .nav-link");

    // Use sessionStorage to check login status
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    // Show Logout only if logged in
    if (logoutBtn) {
        logoutBtn.style.display = isLoggedIn ? "inline-block" : "none";
        logoutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            sessionStorage.clear(); // remove login info
            window.location.href = "index.html"; // redirect to login
        });
    }

    // Protect content of specific pages
    const protectedPages = ["home.html", "check-plant.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        alert("Please login first!");
        window.location.href = "index.html";
    }

    // Add click handler for navbar links to protect pages
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (protectedPages.includes(href)) {
            link.addEventListener("click", function (e) {
                if (!isLoggedIn) {
                    e.preventDefault();
                    alert("Please login first!");
                    window.location.href = "index.html";
                }
            });
        }
    });
});
