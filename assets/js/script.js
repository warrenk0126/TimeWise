document.addEventListener('DOMContentLoaded', () => {
    const saveButtonHandlers = [
      { buttonId: 'saveButton1', inputIds: ['inputBox1'] },
      { buttonId: 'saveButton2', inputIds: ['inputBox2'] },
      { buttonId: 'saveButton3', inputIds: ['inputBox3'] },
      { buttonId: 'saveButton4', inputIds: ['inputBox4'] },
      { buttonId: 'saveButton5', inputIds: ['inputBox5'] },
      { buttonId: 'saveButton6', inputIds: ['inputBox6'] },
      { buttonId: 'saveButton7', inputIds: ['inputBox7', 'inputBox8', 'inputBox9'] },
      { buttonId: 'saveButton8', inputIds: ['inputBox10', 'inputBox11', 'inputBox12'] },
      { buttonId: 'saveButton9', inputIds: ['inputBox13', 'inputBox14', 'inputBox15'] }
    ];
  
    saveButtonHandlers.forEach(handler => {
      const saveButton = document.getElementById(handler.buttonId);
      saveButton.addEventListener('click', () => {
        handler.inputIds.forEach(inputId => {
          const inputValue = document.getElementById(inputId).value;
          localStorage.setItem(inputId, inputValue);
        });
      });
    });
  
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      const savedValue = localStorage.getItem(input.id);
      if (savedValue) {
        input.value = savedValue;
      }
    });
  
    const completeButtons = document.querySelectorAll('[id^="completeButton"]');
    completeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const todoIndex = button.id.slice(-1);
        const inputBox = document.getElementById(`inputBox${todoIndex}`);
        inputBox.classList.toggle('completed');
  
        const completedToDos = JSON.parse(localStorage.getItem('completedToDos')) || [];
        if (inputBox.classList.contains('completed')) {
          completedToDos.push(todoIndex);
        } else {
          const indexToRemove = completedToDos.indexOf(todoIndex);
          if (indexToRemove !== -1) {
            completedToDos.splice(indexToRemove, 1);
          }
        }
        localStorage.setItem('completedToDos', JSON.stringify(completedToDos));
  
        // Update input value in local storage if saved after completing
        const saveButtonHandler = saveButtonHandlers.find(handler => handler.inputIds.includes(inputBox.id));
        if (saveButtonHandler) {
          const inputValue = inputBox.value;
          localStorage.setItem(inputBox.id, inputValue);
        }
      });
    });
  
    const completedToDos = JSON.parse(localStorage.getItem('completedToDos')) || [];
    completedToDos.forEach(todoIndex => {
      const inputBox = document.getElementById(`inputBox${todoIndex}`);
      inputBox.classList.add('completed');
    });
  
    // Additional code for the priorities section (if needed)
  });
  
//////////////////////
// Warren's section //
//////////////////////

// This function updates nearest city name on page
function displayNearestCity(cityName) {
    var nearestCityElement = document.getElementById('nearestCity');
    nearestCityElement.textContent = cityName;
}

// This function fetches nearest city & current weather info
function getNearestCity() {
    // Check if geolocation is supported by browser
    if ("geolocation" in navigator) {
        // Get the user's current position
        navigator.geolocation.getCurrentPosition(
            position => {
                // Extract latitude & longitude from position
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                // Construct URL for reverse geocoding API
                var reverseGeocodingUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

                // Fetch reverse geocoding data
                fetch(reverseGeocodingUrl)
                    .then(response => response.json())
                    .then(data => {
                        // Extract city name from reverse geocoding data
                        var cityName = data.locality;
                        // Update nearest city element on page
                        displayNearestCity(cityName);

                        // For OpenWeather API
                        var apiKey = '90cd0f7c8cafa3d1735247cccfc01c6d';
                        // Construct URL for OpenWeather API
                        var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

                        // Fetch weather data from OpenWeather API
                        fetch(apiUrl)
                            .then(response => response.json())
                            .then(data => {
                                // Extract city name, temperature, and weather description
                                var cityName = data.city.name;
                                var temperatureInK = data.list[0].main.temp;
                                var temperatureInF = (temperatureInK - 273.15) * 9/5 + 32;
                                var roundedTemperature = Math.round(temperatureInF);
                                var weatherDesc = data.list[0].weather[0].description;
                                
                                // Update elements on page with weather info
                                document.getElementById('city').textContent = cityName;
                                document.getElementById('temperature').textContent = roundedTemperature + " °F";
                                document.getElementById('weather').textContent = weatherDesc;
                                document.getElementById('latitude').textContent = latitude;
                                document.getElementById('longitude').textContent = longitude;
                            });
                    });
            }
        );
    }
}

// Call the function to get nearest city and weather info
getNearestCity();
