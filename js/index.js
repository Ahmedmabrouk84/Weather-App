"use strict";

const btnLocationName = document.getElementById("btnLocationName");
const LocationNameInput = document.getElementById("locationName");

const myLightBox = document.querySelector(".light-box");
const myBoxMsg = document.querySelector(".box-msg");
const closeBtn = document.querySelector(".btn-danger");

const monthNames = [
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

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

document.addEventListener("click", function (e) {
  if (e.target == myLightBox) {
    myLightBox.classList.add("d-none");
  }
});

closeBtn.addEventListener("click", function () {
  myLightBox.classList.add("d-none");
});

btnLocationName.addEventListener("click", function () {
  search(LocationNameInput.value);
  LocationNameInput.value = null;
});

let allCurrent = [];
let allForecastDays = [];
let allLocations = {};
let myDate;

async function search(locationName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${locationName}&days=3`
    );
    const myData = await response.json();

    allCurrent = myData.current;
    allLocations = myData.location;
    allForecastDays = myData.forecast.forecastday;
    myDate = new Date(allLocations.localtime);

    console.log(allForecastDays);
    console.log(allCurrent);
    // disblayForecastDays()

    disblayCurrent();
    disblayForecastDays();
  } catch (error) {
    myLightBox.classList.remove("d-none");

    console.log("Error Form API");
  }
}

// =============== disblayCurrent =====================
function disblayCurrent() {
  let boxCurrent = "";
  for (let i = 0; i < 1; i++) {
    boxCurrent += `
    <div class="col-md-4 h-100">
              <div class="card rounded border-0 py-5 pb-3 pt-0">
                <div
                  class="card-title rounded d-flex justify-content-around py-2"
                >
                  <p>${days[myDate.getDay()]}</p>
                  <p>${
                    myDate.getDate() + " " + monthNames[myDate.getMonth()]
                  }</p>
                </div>
                <div class="">
                  <div class="py-3 card-caption">

                    <h2 class="text-center">${allLocations.name}</h2>
                    
                    <p class="ps-4 text-center">
                    ${allCurrent.temp_c}
                    <sup>o
                    </sup>C</p>
                  </div>
                  <div
                    class="d-flex caption2 justify-content-around align-items-center"
                  >
                    <span>
                    <img src="http:${
                      allCurrent.condition.icon
                    }" class="w-100" alt= "condition">
                    </span>
                    <p class="d-block h4">${allCurrent.condition.text}</p>
                  </div>
                </div>
                <div class="py-1 end-card mt-4 d-flex justify-content-evenly">
                  <div class="">
                    <span><i class="fa-solid fa-umbrella"></i></span>
                    <span>20%</span>
                  </div>
                  <div class="">
                    <span><i class="fa-solid fa-sun-plant-wilt"></i></span>
                    <span>18km/h</span>
                  </div>
                  <div class="">
                    <span><i class="fa-solid fa-arrow-trend-up"></i></span>
                    <span> East</span>
                  </div>
                </div>
              </div>
            </div>

    `;
  }
  document.getElementById("rowData").innerHTML = boxCurrent;
}

// =============== disblayForecastDays =====================
function disblayForecastDays() {
  let boxForecastDays = "";
  const forcastDays = allForecastDays;

  for (let i = 1; i < forcastDays.length; i++) {
    boxForecastDays += `
            <div class="col-md-4">
              <div class="card h-100 border-0 ${
                i == 1 ? "imag-card" : "imag-card3"
              }  rounded py-5 pt-0">
                <div
                  class="card-title pb-4 rounded d-flex justify-content-evenly py-2"
                >
                <p>${days[(myDate.getDay() + i) % 7]}</p>
                <p>${
                  myDate.getDate() + i + " " + monthNames[myDate.getMonth()]
                }</p>
                </div>
                <span class="d-block text-center">
                  <img src="http:${
                    forcastDays[i].day.condition.icon
                  }" style="width:70px; height:70px" alt= "condition">
                </span>

                <div class="py-3">
                  <div class="py-3 card-caption3">

                    <p class="text-center">
                    ${forcastDays[i].day.maxtemp_c}
                    <sup>o</sup>C</p>

                    <span class="h6 ps-4 d-block text-center">
                      ${forcastDays[i].day.mintemp_c}
                      <sup>o</sup>
                    </span>
                    <span class="d-block text-center h6">  ${
                      forcastDays[i].day.condition.text
                    } </span>
                  </div>
                </div>
              </div>
            </div>
`;
  }
  document.getElementById("rowData").innerHTML += boxForecastDays;
}

search("cairo");
