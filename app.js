'use strict';

var firstAndPike = {
  locationName: '1st and Pike',
  hourOpen: 6,
  hourClose: 20,
  minCustPerHour: 23,
  maxCustPerHour: 65,
  avgCookiesPerCust: 6.3,
  cookiesPerHourArray: [],

  calcCustomersPerHour: function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
  },

  generatteCookiesPerHourArray: function() {
    for (var i = this.hourOpen; i <= this.hourClose; i++) {
      this.cookiesPerHourArray.push(Math.round(this.calcCustomersPerHour() * this.avgCookiesPerCust));
    };
  }
};

firstAndPike.generatteCookiesPerHourArray();

var storeHeader = document.getElementById('store-name');
storeHeader.textContent = firstAndPike.locationName;

var storeCookieList = document.getElementById('store-hourly-cookie-list');
for (var i = 0; i < firstAndPike.cookiesPerHourArray.length; i++) {
  var liString = '';

  if( (i + firstAndPike.hourOpen) < 13) {
    liString += (firstAndPike.hourOpen + i) + 'am: ';
    liString += firstAndPike.cookiesPerHourArray[i];
  } else {
    liString += (firstAndPike.hourOpen + i - 12) + 'pm: ';
    liString += firstAndPike.cookiesPerHourArray[i];
  }
  liString += ' cookies';

  var cookiesPerHour_liEl = document.createElement('li');
  cookiesPerHour_liEl.textContent = liString;
  storeCookieList.appendChild(cookiesPerHour_liEl) ;
}
