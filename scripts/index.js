
function getAllVehicles() {

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.status == 200 && this.readyState == 4) {
      populateData(this.response);
    }
  }

  xhr.open('GET', 'https://localhost:5001/api/vehicle', true);
  xhr.send();
}

function populateData(strData) {

  let container = document.getElementById('data-container');
  let jData = JSON.parse(strData);

  for(let index in jData) {
    let data = jData[index];
    let divTag = document.createElement('div');
    let ulTag = document.createElement('ul');

    ulTag.innerHTML = `
      <li>id: ${data.id}</li>
      <li>year: ${data.year}</li>
      <li>make: ${data.make}</li>
      <li>model: ${data.model}</li>
    `;
    divTag.append(ulTag);
    container.append(divTag);
    console.log(jData[index]);
  }
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

  xhr.open('POST', 'https://localhost:5001/api/vehicle/', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(payload));
}

window.addEventListener('DOMContentLoaded', function() {

  document.getElementById('getAll').addEventListener('click', getAllVehicles);

  let form = document.getElementById('vehicleForm');
  form.addEventListener('submit', (e) => {submitFormHandler(e)});
});
