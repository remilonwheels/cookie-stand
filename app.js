'use strict';

var allStores = [];
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
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

  if (isNaN(minCust) || isNaN(maxCust) || isNaN(avgOrder)) {
    return alert('Min/max customer and avg order fields must be numbers');
  }

  for (var i = 0; i < allStores.length; i++) {
    if (storeName.toLowerCase() === allStores[i].locationName.toLowerCase()) {
      allStores[i].minCustPerHour = minCust;
      allStores[i].maxCustPerHour = maxCust;
      allStores[i].avgCookiesPerCust = avgOrder;
      updateTable();
      return;
    }
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

updateTable();
