'use strict';

var allStores = [];
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var totalCookiesByHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var allStoresCookieTotal = 0;

var cookiesSummaryTable = document.getElementById('tbl_allStores');
var formAddStore = document.getElementById('form_addStore');

function Store(locationName, minCustPerHour, maxCustPerHour, avgCookiesPerCust) {
  this.locationName = locationName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.cookiesPerHourArray = [];
  this.totalDailyCookies = 0;

  allStores.push(this);
}

Store.prototype.calcCustomersPerHour = function() {
  return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
};

Store.prototype.generateCookiesPerHourArray = function() {
  for (var i = 0; i < hours.length - 1; i++) {
    var hourlyCookies = Math.ceil(this.calcCustomersPerHour() * this.avgCookiesPerCust);
    this.cookiesPerHourArray.push(hourlyCookies);
    this.totalDailyCookies += hourlyCookies;
    totalCookiesByHour[i] += hourlyCookies;
  }
};

Store.prototype.render = function() {
  this.totalDailyCookies = 0;
  this.cookiesPerHourArray = [];
  this.generateCookiesPerHourArray();

  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = this.locationName;
  trEl.appendChild(thEl);
  for (var i = 0; i < hours.length - 1; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesPerHourArray[i];
    trEl.appendChild(tdEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = this.totalDailyCookies;
  trEl.appendChild(thEl);

  cookiesSummaryTable.appendChild(trEl);
};

function updateTable() {
  cookiesSummaryTable.innerHTML = '';

  totalCookiesByHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  allStoresCookieTotal = 0;

  createTableHeader();
  createTableRows();
  createTableFooter();
}

function createTableHeader() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  trEl.appendChild(thEl);
  for (var i = 0; i < hours.length - 1; i++) {
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  trEl.appendChild(thEl);
  cookiesSummaryTable.appendChild(trEl);
}

function createTableRows() {
  for (var i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }
}

function createTableFooter() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Totals';
  trEl.appendChild(thEl);
  for (var i = 0; i < hours.length - 1; i++) {
    thEl = document.createElement('th');
    thEl.textContent = totalCookiesByHour[i];
    trEl.appendChild(thEl);
  }

  for (i = 0; i < allStores.length; i++) {
    allStoresCookieTotal += allStores[i].totalDailyCookies;
  }

  thEl = document.createElement('th');
  thEl.textContent = allStoresCookieTotal;
  trEl.appendChild(thEl);
  cookiesSummaryTable.appendChild(trEl);
}
function handleAddStore(event) {
  event.preventDefault();

  var storeName = event.target.input_storeName.value;
  var minCust = event.target.input_minCust.value;
  var maxCust = event.target.input_maxCust.value;
  var avgOrder = event.target.input_avgOrder.value;

  if (!storeName || !minCust || !maxCust || !avgOrder) {
    return alert('Please fill-in all boxes');
  }

  new Store(storeName, minCust, maxCust, avgOrder);

  updateTable();
}

formAddStore.addEventListener('submit', handleAddStore);

new Store('First and Pike', 23, 65, 6.3);
new Store('Seatac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

createTableHeader();
createTableRows();
createTableFooter();
