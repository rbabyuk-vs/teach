const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const addressList = document.getElementById('addressList');

searchButton.addEventListener('click', () => {
  const city = cityInput.value;
  const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
  const requestBody = {
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName: city,
      Limit: '50',
      Page: '2'
    }
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': 'YOUR_API_KEY_DO_NOT_STORE_HERE'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      addressList.innerHTML = ''; // Clear previous results
      if (data.data) {
        data.data.forEach(address => {
          const listItem = document.createElement('li');
          listItem.textContent = address.Description;
          addressList.appendChild(listItem);
        });
      } else {
        console.error('Error:', data.errors);
      }
    })
    .catch(error => console.error('Error:', error));
});