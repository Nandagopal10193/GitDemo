function openUserModule() {

    const loggedIn =
        localStorage.getItem(
            "travelEaseLoggedIn"
        ) === "true";

    const role =
        localStorage.getItem(
            "travelEaseRole"
        );


    if (!loggedIn || role !== "user") {

        alert(
            "Please login as a User first."
        );

        return;
    }


    document.getElementById(
        "userDashboard"
    ).style.display = "block";


    const user =
        JSON.parse(
            localStorage.getItem(
                "travelEaseUser"
            ) || "{}"
        );


    document.getElementById(
        "userProfile"
    ).textContent =
        user.name ||
        "User";
}

