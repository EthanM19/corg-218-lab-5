function createCardElement(item) {
  return `
      <li class="card">
          <div class="card-content">
              <p class="subheader">
                  ${item.location}
              </p>
              <h3 class="header">
                  ${item.temperature}°C
              </h3>
          </div>
      </li>
  `;
}

async function fetchWeather(location) {
  try {
      const apiKey = 'u6Ot8ll85gna6mmoDtzRLh8ieZeQPUJV';
      const response = await fetch(`https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature,weatherCode&units=metric&timesteps=current&apikey=${apiKey}`);
      const data = await response.json();
      return data.data.timelines[0].intervals[0].values;
  } catch (error) {
      console.log(error);
  }
}

function renderOption1Results(data) {
  const location = "Weather";
  if (data && data.temperature && data.weatherCode) {
      const card = createCardElement({
          location: location,
          temperature: data.temperature,
          weather_descriptions: [data.weatherCode]
      });
      document.getElementById("option-1-results").innerHTML = card;
  } else {
      console.error("Invalid data format received from Tomorrow.io API");
  }
}

async function option1DropdownClickHandler(event) {
  const select = document.getElementById("location-select");
  const location = select.options[select.selectedIndex].value;
  const data = await fetchWeather(location);
  if (data) {
      renderOption1Results(data);
  }
}

async function renderOption1Dropdown() {
  const select = document.getElementById("location-select");
  const locations = ["New York", "London", "Calgary"];
  locations.forEach((location) => {
      const option = document.createElement("option");
      option.textContent = location;
      option.value = location;
      select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  renderOption1Dropdown();

  const option1SubmitButton = document.getElementById("submit-button");
  option1SubmitButton.addEventListener("click", option1DropdownClickHandler);
});