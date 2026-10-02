
/* =====================================================
   TRAVEL SERVICES
===================================================== */

let selectedBookingType = "";


function showBookingForm(service) {

    selectedBookingType = service;


    const form =
        document.getElementById(
            "bookingForm"
        );


    if (!form) {
        return;
    }


    document.getElementById(
        "bookingTitle"
    ).textContent =
        service + " Booking";


    form.style.display = "block";


    const hotelFields =
        document.getElementById(
            "hotelExtraFields"
        );


    if (hotelFields) {

        if (service === "Hotel") {

            hotelFields.style.display =
                "block";

        } else {

            hotelFields.style.display =
                "none";

        }

    }


    form.scrollIntoView({
        behavior: "smooth"
    });
}


function closeBookingForm() {

    const form =
        document.getElementById(
            "bookingForm"
        );


    if (form) {

        form.style.display =
            "none";

    }
}


function submitBooking() {

    const from =
        document.getElementById(
            "bookingFrom"
        ).value.trim();


    const to =
        document.getElementById(
            "bookingTo"
        ).value.trim();


    const date =
        document.getElementById(
            "bookingDate"
        ).value;


    const travellers =
        document.getElementById(
            "bookingTravellers"
        ).value;


    const nightsElement =
        document.getElementById(
            "bookingNights"
        );


    const nights =
        nightsElement
            ? nightsElement.value
            : 1;


    if (!from || !to || !date) {

        alert(
            "Please enter starting location, destination and travel date."
        );

        return;
    }


    const booking = {

        id:
            "BOOK-" +
            Date.now(),

        service:
            selectedBookingType,

        from:
            from,

        destination:
            to,

        date:
            date,

        travellers:
            travellers,

        nights:
            nights

    };


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "travelEaseBookings"
            ) || "[]"
        );


    bookings.push(booking);


    localStorage.setItem(
        "travelEaseBookings",
        JSON.stringify(bookings)
    );


    const result =
        document.getElementById(
            "bookingResult"
        );


    result.innerHTML = `

        <div class="itinerary-card">

            <h2>
                ✅ ${selectedBookingType} Request Created
            </h2>

            <p>
                <strong>From:</strong>
                ${from}
            </p>

            <p>
                <strong>Destination:</strong>
                ${to}
            </p>

            <p>
                <strong>Date:</strong>
                ${date}
            </p>

            <p>
                <strong>Travellers:</strong>
                ${travellers}
            </p>

            ${
                selectedBookingType === "Hotel"
                ?
                `<p>
                    <strong>Nights:</strong>
                    ${nights}
                </p>`
                :
                ""
            }

            <a
                class="btn"
                target="_blank"
                href="${googleMapsSearch(
                    to
                )}"
            >
                📍 Open Destination in Google Maps
            </a>

        </div>

    `;


    closeBookingForm();


    result.scrollIntoView({
        behavior: "smooth"
    });
}


/* =====================================================
   GOOGLE MAPS
===================================================== */

function googleMapsSearch(query) {

    return (
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(query)
    );

}


/* =====================================================
   COMPLETE ITINERARY
===================================================== */

function generateItinerary() {

    const destination =
        document.getElementById(
            "destination"
        ).value.trim();


    const startLocation =
        document.getElementById(
            "startLocation"
        ).value.trim();


    const duration =
        parseInt(
            document.getElementById(
                "duration"
            ).value
        );


    const travellers =
        document.getElementById(
            "travellers"
        ).value;


    if (
        !destination ||
        !duration ||
        duration < 1
    ) {

        alert(
            "Please enter destination and number of days."
        );

        return;
    }


    let result = "";


    for (
        let day = 1;
        day <= duration;
        day++
    ) {

        result += createDayPlan(
            day,
            destination,
            startLocation,
            travellers
        );

    }


    document.getElementById(
        "itineraryResult"
    ).innerHTML = `

        <div class="trip-summary">

            <h2>
                🧳 Your Complete ${duration}-Day Trip
            </h2>

            <p>
                <strong>Starting Location:</strong>
                ${startLocation || "Not specified"}
            </p>

            <p>
                <strong>Destination:</strong>
                ${destination}
            </p>

            <p>
                <strong>Travellers:</strong>
                ${travellers}
            </p>

            <p>
                Each location below has a Google Maps
                button so you can view the place,
                directions, ratings and opening hours.
            </p>

        </div>

        ${result}

    `;


    const itineraryData = {

        destination:
            destination,

        startLocation:
            startLocation,

        duration:
            duration,

        travellers:
            travellers,

        createdAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "travelEaseItinerary",
        JSON.stringify(
            itineraryData
        )
    );


    document.getElementById(
        "itineraryResult"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


/* =====================================================
   DAY PLAN
===================================================== */

function createDayPlan(
    day,
    destination,
    startLocation,
    travellers
) {

    const attractionSearch =
        `${destination} tourist attractions`;


    const morningSearch =
        `${destination} famous tourist places`;


    const afternoonSearch =
        `${destination} sightseeing attractions`;


    const eveningSearch =
        `${destination} evening attractions`;


    const breakfastSearch =
        `${destination} breakfast restaurants`;


    const lunchSearch =
        `${destination} lunch restaurants`;


    const dinnerSearch =
        `${destination} dinner restaurants`;


    /*
       Different search terms for each day.
       Google Maps will show suitable locations.
    */

    let morningActivity;
    let afternoonActivity;
    let eveningActivity;


    if (day === 1) {

        morningActivity =
            "Start with the most famous attractions";


        afternoonActivity =
            "Visit important historical and cultural places";


        eveningActivity =
            "Explore a popular evening attraction";

    }

    else if (day === 2) {

        morningActivity =
            "Explore another major sightseeing area";


        afternoonActivity =
            "Visit museums, monuments or local attractions";


        eveningActivity =
            "Explore shopping streets and local markets";

    }

    else if (day === 3) {

        morningActivity =
            "Visit a nearby famous attraction";


        afternoonActivity =
            "Explore local culture and landmarks";


        eveningActivity =
            "Enjoy the city's popular evening area";

    }

    else {

        morningActivity =
            "Explore more famous places in the destination";


        afternoonActivity =
            "Discover local attractions and hidden places";


        eveningActivity =
            "Enjoy local shopping and entertainment";

    }


    return `

        <div class="day-plan">

            <div class="day-header">

                <h2>
                    📅 Day ${day}
                </h2>

                <span>
                    ${travellers} Traveller(s)
                </span>

            </div>


            <!-- MORNING -->

            <div class="time-block">

                <div class="time-icon">
                    🌅
                </div>

                <div class="time-content">

                    <h3>
                        Morning
                    </h3>

                    <h4>
                        ☕ Breakfast
                    </h4>

                    <p>
                        Start your day with breakfast
                        at a nearby restaurant.
                    </p>

                    <a
                        class="map-btn"
                        target="_blank"
                        href="${googleMapsSearch(
                            breakfastSearch
                        )}"
                    >
                        📍 Find Breakfast on Google Maps
                    </a>


                    <h4>
                        📸 Sightseeing
                    </h4>

                    <p>
                        ${morningActivity}.
                    </p>

                    <a
                        class="map-btn"
                        target="_blank"
                        href="${googleMapsSearch(
                            morningSearch
                        )}"
                    >
                        📍 Find Morning Places
                    </a>

                </div>

            </div>


            <!-- AFTERNOON -->

            <div class="time-block">

                <div class="time-icon">
                    ☀️
                </div>

                <div class="time-content">

                    <h3>
                        Afternoon
                    </h3>

                    <h4>
                        🏛️ Visiting Spots
                    </h4>

                    <p>
                        ${afternoonActivity}.
                    </p>

                    <a
                        class="map-btn"
                        target="_blank"
                        href="${googleMapsSearch(
                            afternoonSearch
                        )}"
                    >
                        📍 Find Afternoon Places
                    </a>


                    <h4>
                        🍛 Lunch
                    </h4>

                    <p>
                        Take a break and enjoy
                        local food.
                    </p>

                    <a
                        class="map-btn"
                        target="_blank"
                        href="${googleMapsSearch(
                            lunchSearch
                        )}"
                    >
                        📍 Find Lunch Restaurants
                    </a>

                </div>

            </div>


            <!-- EVENING -->

            <div class="time-block">

                <div class="time-icon">
                    🌆
                </div>

                <div class="time-content">

                    <h3>
                        Evening
                    </h3>

                    <h4>
                        🎯 Activity
                    </h4>

                    <p>
                        ${eveningActivity}.
                    </p>

                    <a
                        class="map-btn"
                        target="_blank"
                        href="${googleMapsSearch(
                            eveningSearch
                        )}"
                    >
                        📍 Find Evening Places
                    </a>

                </div>

            </div>


            <!-- NIGHT -->

            <div class="time-block">

                <div class="time-icon">
                    🌙
                </div>

                <div class="time-content">

                    <h3>
                        Night
                    </h3>

                    <h4>
                        🍽️ Dinner
                    </h4>

                    <p>
                        Finish the day with dinner
                        at a nearby restaurant.
                    </p>

                    <a
                        class="map-btn"
                        target="_blank"
                        href="${googleMapsSearch(
                            dinnerSearch
                        )}"
                    >
                        📍 Find Dinner Restaurants
                    </a>


                    <h4>
                        🏨 Hotel
                    </h4>

                    <p>
                        Return to your hotel and
                        rest for the next day.
                    </p>

                    <a
                        class="map-btn"
                        target="_blank"
                        href="${googleMapsSearch(
                            destination +
                            " hotels"
                        )}"
                    >
                        📍 Find Hotels
                    </a>

                </div>

            </div>

        </div>

    `;
}

