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
  
    //////////////////////
    // Warren's section //
    //////////////////////
  
    function displayWeatherDescAndCityName(temperature, cityName, weatherDesc) {
        var weatherElement = document.getElementById('weatherDesc');
        var cityElement = document.getElementById('city');
        var temperatureElement = document.getElementById('temperature');

        weatherElement.textContent = `It's currently ${temperature}°F in ${cityName} with ${weatherDesc}.`;
        cityElement.textContent = '';
        temperatureElement.textContent = '';
    }

    function getNearestCity() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    var apiKey = '90cd0f7c8cafa3d1735247cccfc01c6d';
                    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            var cityName = data.name;
                            var temperatureInF = Math.round(data.main.temp);
                            var weatherDesc = data.weather[0].description;

                            document.getElementById('city').textContent = cityName;
                            document.getElementById('temperature').textContent = temperatureInF + " °F";

                            displayWeatherDescAndCityName(temperatureInF, cityName, weatherDesc);
                        });
                }
            );
        }
    }

    getNearestCity();
  
    /////////////////////////////
    // End of Warren's section //
    /////////////////////////////
  });
  