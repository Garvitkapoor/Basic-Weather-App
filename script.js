const tempratureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dateAndTimeField = document.querySelectorAll(".time_location p")[1];
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".Search_area"); // fixed casing
const form = document.querySelector('form');

let target = 'Mumbai';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=9c49fac904aa47f4b4a153018251008&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
};

function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];

    let currentDay = getDayName(new Date(splitDate).getDay());

    tempratureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateAndTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

form.addEventListener('submit', searchForLocation);

fetchResults(target);

function getDayName(num) {
    switch (num) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}
