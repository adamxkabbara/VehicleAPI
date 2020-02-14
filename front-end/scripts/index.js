
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

function getOneVehicle() {
  let inputData = document.getElementById('getVehicleInput').value;
  if (!inputData || isNaN(inputData)) {
    alert("Please enter a valid id");
    return;
  }

  let url = 'https://localhost:5001/api/vehicle/'+ inputData;
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.status == 200 && this.readyState == 4) {
      populateOneData(this.response);
    }
  }

  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
}

function deleteVehicle(id, divVehicle) {
  divVehicle.remove();

  let url = 'https://localhost:5001/api/vehicle/'+ id;
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.status == 200 && this.readyState == 4) {
      alert('Deleted Vehicle with id = ' + id);
    }
  }

  xhr.open('DELETE', url, true);
  xhr.setRequestHeader('Content-Type', 'text/plain');
  xhr.send();
}

function populateOneData(strData) {
  let container = document.getElementById('data-container');
  container.innerHTML = null;
  let jData = JSON.parse(strData);

  let divTag = document.createElement('div');
  let ulTag = document.createElement('ul');

  let deleteButtonTag = document.createElement('button');
  deleteButtonTag.innerText = 'DELETE';
  deleteButtonTag.addEventListener('click', () => {deleteVehicle(jData.id, divTag)});

  ulTag.innerHTML = `
    <li>id: ${jData.id}</li>
    <li>year: ${jData.year}</li>
    <li>make: ${jData.make}</li>
    <li>model: ${jData.model}</li>
  `

  divTag.append(ulTag);
  divTag.append(deleteButtonTag);
  container.append(divTag);
}

function populateData(strData) {

  let container = document.getElementById('data-container');
  container.innerHTML = null;
  let jData = JSON.parse(strData);

  for(let index in jData) {
    let data = jData[index];
    let divTag = document.createElement('div');
    let ulTag = document.createElement('ul');

    let deleteButtonTag = document.createElement('button');
    deleteButtonTag.innerText = 'DELETE';
    deleteButtonTag.addEventListener('click', () => {deleteVehicle(data.id, divTag)});

    ulTag.innerHTML = `
      <li>id: ${data.id}</li>
      <li>year: ${data.year}</li>
      <li>make: ${data.make}</li>
      <li>model: ${data.model}</li>
    `;
    divTag.append(ulTag);
    divTag.append(deleteButtonTag);
    container.append(divTag);
  }
}

function submitFormHandler(e) {
  e.preventDefault();
  
  let id = document.getElementById('idInput').value;
  let year = document.getElementById('yearInput').value;
  let make = document.getElementById('makeInput').value;
  let model = document.getElementById('modelInput').value;

  if (year < 1950 || year > 2020) {
    alert('Please enter a year between 1950 and 2050');
    return;
  }

  let payload = {
    "Id": parseInt(id),
    "Year": parseInt(year),
    "Make": make,
    "Model": model
  }

  let xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert('Added Vehicle with \nId: ' + id + '\nYear: ' + year + '\nMake: ' + make + '\nModel: ' + model);
    }
  }

  xhr.open('POST', 'https://localhost:5001/api/vehicle', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(payload));
}

window.addEventListener('DOMContentLoaded', function() {

  document.getElementById('getAll').addEventListener('click', getAllVehicles);
  document.getElementById('getOne').addEventListener('click', getOneVehicle);

  let form = document.getElementById('vehicleForm');
  form.addEventListener('submit', (e) => {submitFormHandler(e)});
});
