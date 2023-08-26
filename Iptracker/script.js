'use strict';

const API_KEY = '6f3816355e174553ab98cf5740385a0a';

// get HTML elements
var current_ip = document.getElementById('currentip');
var current_town = document.getElementById('currenttown');
var current_zone = document.getElementById('current_zone');
var current_isp = document.getElementById('currentisp');

var entered_ip = document.querySelector('.input-field');
var search_btn = document.querySelector('.submit-button');

// leaflet map
var map = L.map('MAPDISPLAY').setView([6.510030, 3.360610], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// function to update map marker and view
var updateMarker = (update_marker = [6.510030, 3.360610]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};

// function to get IP details
var getIPDetails = (default_ip) => {
  let ip_url;
  if (default_ip === undefined) {
    ip_url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=`;
  } else {
    ip_url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${default_ip}`;
  }
  fetch(ip_url)
    .then((response) => response.json())
    .then((data) => {
      current_ip.innerHTML = data.ip;
      current_town.innerHTML = `${data.city}, ${data.country_name}, ${data.postal_code}`;
      current_zone.innerHTML = `UTC${data.time_zone.offset}`;
      current_isp.innerHTML = data.isp;

      // Update map marker
      updateMarker([data.latitude, data.longitude]);
    })
    .catch((error) => {
      alert('Unable to get IP details');
      console.log(error);
    });
};

// Event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', updateMarker);

// Event listener for search button click
search_btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (entered_ip.value.trim() !== '') {
    getIPDetails(entered_ip.value);
  } else {
    alert('Please enter a valid IP address');
  }
});




