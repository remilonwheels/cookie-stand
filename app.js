'use strict';

var allStores = [];
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var totalCookiesByHour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var allStoresCookieTotal = 0;

function Store(locationName, minCustPerHour, maxCustPerHour, avgCookiesPerCust) {
  this.locationName = locationName;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.cookiesPerHourArray = [];
  this.totalDailyCookies = 0;

  this.calcCustomersPerHour = function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
  };

  this.generateCookiesPerHourArray = function() {
    for (var i = 0; i < hours.length - 1; i++) {
      var hourlyCookies = Math.ceil(this.calcCustomersPerHour() * this.avgCookiesPerCust);
      this.cookiesPerHourArray.push(hourlyCookies);
      this.totalDailyCookies += hourlyCookies;
      totalCookiesByHour[i] += hourlyCookies;
    }
  };

  this.render = function() {
    this.generateCookiesPerHourArray();

    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = this.locationName;
    trEl.appendChild(tdEl);
    for (var i = 0; i < hours.length - 1; i++) {
      tdEl = document.createElement('td');
      tdEl.textContent = this.cookiesPerHourArray[i];
      trEl.appendChild(tdEl);
    }
    tdEl = document.createElement('td');
    tdEl.textContent = this.totalDailyCookies;
    trEl.appendChild(tdEl);

    cookiesSummaryTable.appendChild(trEl);
  };

  allStores.push(this);
}

new Store('First and Pike', 23, 65, 6.3);
new Store('Seatac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

var cookiesSummaryTable = document.getElementById('tbl_allStores');


//Create table header
//    Create empty cell in table header
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

for (i = 0; i < allStores.length; i++) {
  allStores[i].render();
}

trEl = document.createElement('tr');
var tdEl = document.createElement('td');
tdEl.textContent = 'Totals';
trEl.appendChild(tdEl);
for (i = 0; i < hours.length - 1; i++) {
  tdEl = document.createElement('td');
  tdEl.textContent = totalCookiesByHour[i];
  trEl.appendChild(tdEl);
}

for (i = 0; i < allStores.length; i++) {
  allStoresCookieTotal += allStores[i].totalDailyCookies;
}


tdEl = document.createElement('td');
tdEl.textContent = allStoresCookieTotal;
trEl.appendChild(tdEl);
cookiesSummaryTable.appendChild(trEl);
