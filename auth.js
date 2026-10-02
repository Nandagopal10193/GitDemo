
/* =========================
   OPEN LOGIN
========================= */

function openLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "flex";

}


/* =========================
   CLOSE LOGIN
========================= */

function closeLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "none";

}


/* =========================
   REGISTER USER
========================= */

function registerUser() {

    const name =
        document.getElementById(
            "registerName"
        ).value.trim();


    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    if (!name || !email || !password) {

        alert(
            "Please fill all registration fields."
        );

        return;
    }


    const users =
        JSON.parse(
            localStorage.getItem(
                "travelEaseUsers"
            ) || "[]"
        );


    const existingUser =
        users.find(
            user =>
                user.email.toLowerCase() ===
                email.toLowerCase()
        );


    if (existingUser) {

        alert(
            "This email is already registered."
        );

        return;
    }


    const newUser = {

        id:
            "USER-" +
            Date.now(),

        name: name,

        email: email,

        password: password,

        role: "user"

    };


    users.push(newUser);


    localStorage.setItem(
        "travelEaseUsers",
        JSON.stringify(users)
    );


    alert(
        "Account created successfully!"
    );


    document.getElementById(
        "loginEmail"
    ).value = email;


    document.getElementById(
        "loginPassword"
    ).value = password;

}


/* =========================
   LOGIN
========================= */

function loginUser() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    /* ADMIN LOGIN */

    if (
        email.toLowerCase() ===
        "admin@travelease.com"
        &&
        password === "admin123"
    ) {

        const admin = {

            name:
                "TravelEase Administrator",

            email:
                "admin@travelease.com",

            role:
                "admin"

        };


        localStorage.setItem(
            "travelEaseUser",
            JSON.stringify(admin)
        );


        localStorage.setItem(
            "travelEaseRole",
            "admin"
        );


        localStorage.setItem(
            "travelEaseLoggedIn",
            "true"
        );


        closeLogin();


        alert(
            "Admin login successful!"
        );


        window.location.href =
            "modules.html";


        return;
    }


    /* USER LOGIN */

    const users =
        JSON.parse(
            localStorage.getItem(
                "travelEaseUsers"
            ) || "[]"
        );


    const user =
        users.find(
            item =>
                item.email.toLowerCase() ===
                email.toLowerCase()
                &&
                item.password === password
        );


    if (!user) {

        alert(
            "Invalid email or password."
        );

        return;
    }


    localStorage.setItem(
        "travelEaseUser",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "travelEaseRole",
        "user"
    );


    localStorage.setItem(
        "travelEaseLoggedIn",
        "true"
    );


    closeLogin();


    alert(
        "Welcome, " +
        user.name +
        "!"
    );


    window.location.href =
        "modules.html";
}


/* =========================
   LOGOUT
========================= */

function logoutUser() {

    localStorage.removeItem(
        "travelEaseUser"
    );

    localStorage.removeItem(
        "travelEaseRole"
    );

    localStorage.removeItem(
        "travelEaseLoggedIn"
    );


    window.location.href =
        "index.html";
}

