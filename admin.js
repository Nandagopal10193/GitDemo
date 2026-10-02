
function openAdminModule() {

    const loggedIn =
        localStorage.getItem(
            "travelEaseLoggedIn"
        ) === "true";

    const role =
        localStorage.getItem(
            "travelEaseRole"
        );


    if (!loggedIn || role !== "admin") {

        alert(
            "Admin access required.\n\n" +
            "Demo Login:\n" +
            "admin@travelease.com\n" +
            "admin123"
        );

        return;
    }


    document.getElementById(
        "adminDashboard"
    ).style.display = "block";


    const users =
        JSON.parse(
            localStorage.getItem(
                "travelEaseUsers"
            ) || "[]"
        );


    document.getElementById(
        "adminUsers"
    ).textContent =
        users.length;


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "travelEaseBookings"
            ) || "[]"
        );


    document.getElementById(
        "adminBookings"
    ).textContent =
        bookings.length;
}
