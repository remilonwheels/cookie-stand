'use strict';

var stores = [];

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

var seaTacAirport = {
  locationName: 'SeaTac Airport',
  hourOpen: 6,
  hourClose: 20,
  minCustPerHour: 3,
  maxCustPerHour: 24,
  avgCookiesPerCust: 1.2,
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

var seattleCenter = {
  locationName: 'Seattle Center',
  hourOpen: 6,
  hourClose: 20,
  minCustPerHour: 11,
  maxCustPerHour: 38,
  avgCookiesPerCust: 3.7,
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

var capitolHill = {
  locationName: 'Capitol Hill',
  hourOpen: 6,
  hourClose: 20,
  minCustPerHour: 20,
  maxCustPerHour: 38,
  avgCookiesPerCust: 2.3,
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

var alki = {
  locationName: 'Alki',
  hourOpen: 6,
  hourClose: 20,
  minCustPerHour: 2,
  maxCustPerHour: 16,
  avgCookiesPerCust: 4.6,
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

stores.push(firstAndPike);
stores.push(seaTacAirport);
stores.push(seattleCenter);
stores.push(capitolHill);
stores.push(alki);

for(var i = 0; i < stores.length; i++) {
  stores[i].generatteCookiesPerHourArray();
  var storeHeader = document.getElementById('store-name-' + i);
  storeHeader.textContent = stores[i].locationName;

  var storeCookieList = document.getElementById('store-hourly-cookie-list-' + i);
  for (var j = 0; j < stores[i].cookiesPerHourArray.length; j++) {
    var liString = '';

    if( (j + stores[i].hourOpen) < 13) {
      liString += (stores[i].hourOpen + j) + 'am: ';
      liString += stores[i].cookiesPerHourArray[j];
    } else {
      liString += (stores[i].hourOpen + j - 12) + 'pm: ';
      liString += stores[i].cookiesPerHourArray[j];
    }
    liString += ' cookies';

    var cookiesPerHour_liEl = document.createElement('li');
    cookiesPerHour_liEl.textContent = liString;
    storeCookieList.appendChild(cookiesPerHour_liEl) ;
  }
  var totalCookies_liEl = document.createElement('li');

  totalCookies_liEl.textContent = 'Total: ' + sumArray(stores[i].cookiesPerHourArray) + ' cookies';
  storeCookieList.appendChild(totalCookies_liEl);
}

function sumArray(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}
