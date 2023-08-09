function displayNearestCity(cityName) {
    var nearestCityElement = document.getElementById('nearestCity');
    nearestCityElement.textContent = cityName;
}
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
function getNearestCity() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var reverseGeocodingUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en';
                
                // Reverse Geocoding API
                fetch(reverseGeocodingUrl)
                    .then(response => response.json())
                    .then(data => {
                        var cityName = data.locality;
                        displayNearestCity(cityName);

                        // For OpenWeather API
                        var apiKey = '90cd0f7c8cafa3d1735247cccfc01c6d';
                        var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=90cd0f7c8cafa3d1735247cccfc01c6d';

                        fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {});
                            var cityName = data.name;
                            var temperature = data.temp;
                            var weatherDesc = data.weather[0].description;
                            document.getElementById('city').textContent = cityName;
                            document.getElementById('temperature').textContent = temperature;
                            document.getElementById('weather').textContent = weatherDesc
                            latitude.textContent = latitude;
                            longitude.textContent = longitude;
                        });
            }
        )
    }
}
getNearestCity();
