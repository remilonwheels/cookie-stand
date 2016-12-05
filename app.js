'use strict';

var firstAndPike = {
  name: '1st and Pike',
  hourOpen: 6,
  hourClose: 20,
  minCustPerHour: 23,
  maxCustPerHour: 65,
  avgCookiesPerCust: 6.3,
  cookiesPerHourArray: [],

  calcCustomersPerHour: function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour;
  },

  generateCookiesPerHourArray: function() {
    for (var i = this.hourOpen; i <= this.hourClose; i++) {
      this.cookiesPerHourArray.push(Math.round(this.calcCustomersPerHour() * this.avgCookiesPerCust));
    };
  }
};
