const searchInput = document.getElementById("searchInput");
let data = ``;

const geocodingApiKey = "3cfbe9884b2144c3bfc4fd1f21719c96";
const weatherApiKey = "64351c3c8d4e4f1d8a9203033241512";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

async function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let location = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${geocodingApiKey}`
  );
  let locationData = await location.json();
  if (locationData.results.length > 0) {
    const city = locationData.results[0].components.city || "City not found";
    getWeather(city);
  }
}

function error() {
  console.error("Unable to retrieve your location.");
}

getLocation();

async function getWeather(country) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${country}&days=3`
  );
  data = await res.json();
  display();
}

searchInput.addEventListener("keyup", function (e) {
  getWeather(e.target.value);
});

function display() {
  const { name } = data.location;
  const { text, icon } = data.current.condition;
  const { temp_c, wind_kph, wind_dir, humidity } = data.current;

  let days = `            <div class="col-md-4 full-card">
              <div class="day-main rounded-start-3">
                <div
                  class="day-header d-flex justify-content-between align-items-center"
                >
                  <p class="day mb-0">${currentDay}</p>
                  <p class="date mb-0">${currentDate + currentMonth}</p>
                </div>
                <div class="day-content">
                  <p class="h5">${name}</p>
                  <div
                    class="degree d-flex align-items-center"
                  >
                    <div class="number">${temp_c}<sup>o</sup>C</div>
                    <div class="day-icon">
                      <img
                        src="${icon}"
                        class=""
                        alt=""
                        width="95"
                      />
                    </div>
                  </div>
                  <div class="custom">${text}</div>
                  <span
                    ><img src="images/icon-umberella@2x.png" alt="" />${humidity}</span
                  >
                  <span
                    ><img src="images/icon-wind@2x.png" alt="" />${wind_kph}</span
                  >
                  <span
                    ><img src="images/icon-compass@2x.png" alt="" />${wind_dir}</span
                  >
                </div>
              </div>
            </div>
            <div class="col-md-4 full-card">
              <div class="day-main dark">
                <div class="day-header">
                  <p class="day mb-0">${nextDay}</p>
                </div>
                <div class="day-content text-center">
                  <div class="day-icon">
                    <img src="${
                      data.forecast.forecastday[1].day.condition.icon
                    }" alt="" />
                  </div>
                  <div class="degree fs-4 text-white">${
                    data.forecast.forecastday[1].day.maxtemp_c
                  }<sup>o</sup>C</div>
                  <small class="fs-6">${
                    data.forecast.forecastday[1].day.mintemp_c
                  }<sup>o</sup></small>
                  <div class="custom">${
                    data.forecast.forecastday[1].day.condition.text
                  }</div>
                </div>
              </div>
            </div>
            <div class="col-md-4 full-card">
              <div class="day-main rounded-end-3">
                <div class="day-header">
                  <p class="day mb-0">${dayAfterNext}</p>
                </div>
                <div class="day-content text-center">
                  <div class="day-icon">
                    <img src="${
                      data.forecast.forecastday[2].day.condition.icon
                    }" alt="" />
                  </div>
                  <div class="degree fs-4 text-white">${
                    data.forecast.forecastday[2].day.maxtemp_c
                  }<sup>o</sup>C</div>
                  <small class="fs-6">${
                    data.forecast.forecastday[2].day.mintemp_c
                  }<sup>o</sup></small>
                  <div class="custom">${
                    data.forecast.forecastday[2].day.condition.text
                  }</div>
                </div>
              </div>
            </div>`;

  document.getElementById("Data").innerHTML = days;
}

const today = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function getFormattedDate(date) {
  const dayName = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  return { dayName, day, month };
}
const {
  dayName: currentDay,
  day: currentDate,
  month: currentMonth,
} = getFormattedDate(today);
const {
  dayName: nextDay,
  day: nextDayDate,
  month: nextMonth,
} = getFormattedDate(new Date(today.setDate(today.getDate() + 1)));
const {
  dayName: dayAfterNext,
  day: dayAfterNextDate,
  month: dayAfterNextMonth,
} = getFormattedDate(new Date(today.setDate(today.getDate() + 1)));

let navItem = document.querySelectorAll(".nav-item");
for (let i = 0; i < navItem.length; i++) {
  navItem[i].addEventListener("click", function () {
    let activeLink = document.querySelector(".nav-item a.active");
    activeLink.classList.remove("active");
    navItem[i].firstElementChild.classList.add("active");
  });
}
