
function getAllVehicles() {

  let xhr = new XMLHttpRequest();

  xhr.onload = function(data) {
    console.log(data);
  }

  xhr.open('GET', 'https://localhost:5001/api/vehicle', true);
  xhr.send();
}

function loadVehicleHandler() {
  let vehicleContainer = document.getElementById('vehicles-container');


}

function submitFormHandler(e) {
  e.preventDefault();
  
  let id = document.getElementById('idInput').value;
  let year = document.getElementById('yearInput').value;
  let make = document.getElementById('makeInput').value;
  let model = document.getElementById('modelInput').value;

  let payload = {
    "Id": parseInt(id),
    "Year": parseInt(year),
    "Make": make,
    "Model": model
  }

  console.log(payload);

  let xhr = new XMLHttpRequest();

  xhr.onload = function(data) {
    console.log(data);
  }

  xhr.open('GET', 'https://localhost:5001/api/vehicle', true);
  xhr.send(JSON.stringify(payload));
}

window.addEventListener('DOMContentLoaded', function() {

  document.getElementById('getAll').addEventListener('click', getAllVehicles);

  let form = document.getElementById('vehicleForm');
  form.addEventListener('submit', (e) => {submitFormHandler(e)});
});
