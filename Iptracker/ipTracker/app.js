const myForm = document.querySelector('form');
const myIpAddr = document.querySelector('.ip-addr h2');
const myLocation = document.querySelector('.location h2');
const myTimezone = document.querySelector('.timezone h2');
const myIsp = document.querySelector('.isp h2');
const errorMessage = document.querySelector('.error-message');
// Map creation
const myMap = L.map('myMap').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

const myIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [40, 50],
  iconAnchor: [20, 50] 
});

let myMarker;

const mapDisplay = (lat, lng) => {
  myMap.setView([lat, lng], 16);

  if (myMarker) myMarker.remove();

  myMarker = L.marker([lat, lng], { icon: myIcon }).addTo(myMap);
};

// Get the info the page needs
const getData = (inputValue = '', searchType = 'IP') => {

  const apiKey = 'at_mrynU6iAELbDDua1k4TVs9OdIU59f'; 

  const url =
    searchType === 'IP'
      ? `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${inputValue}`
      : `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${inputValue}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      myIpAddr.innerText = data.ip;
      myLocation.innerText = `${data.location.region}, ${data.location.city}`;
      myTimezone.innerText = `UTC ${data.location.timezone}`;
      myIsp.innerText = data.isp;
      mapDisplay(data.location.lat, data.location.lng);
    })
    .catch((error) => {
      myIpAddr.innerText = '__';
      myLocation.innerText = '__';
      myTimezone.innerText = '__';
      myIsp.innerText = '__';

      const myInput = myForm.searchInput;
      myInput.classList.add('error');

      setTimeout(() => myInput.classList.remove('error'), 3000);
      console.error(error);
    });
};

// Search for any IP addresses or domains and see the key information and location
const regexIp = /^\b([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b(\.\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b){3}$/;
const regexDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

myForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const myInput = myForm.searchInput;

  if (myInput.value.match(regexIp)) {
    getData(myInput.value);
  }

  if (myInput.value.match(regexDomain)) {
    getData(myInput.value, 'DOMAIN');
  }
  
  if (!myInput.value.match(regexDomain) && !myInput.value.match(regexIp)) {
    myInput.classList.add('error');
    
    errorMessage.textContent = 'Invalid input. Please enter a valid IP address or domain name.';
    errorMessage.style.display = 'block';

    setTimeout(() => {
        myInput.classList.remove('error');
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }, 3000);
}

  myInput.value = ''; 
});

// Load IP Address on the map on the initial page load
getData();


