"use strict";

const axios = require("axios");

async function getapidatafav(req, res) {
  let url = `https://fruit-api-301.herokuapp.com/getFruit`;
  await axios.get(url).then((apidataresults) => {
    let apidataresultsarr = apidataresults.data.fruits.map((item) => {
      return new fruitsData(item);
    });
    res.send(apidataresultsarr);
  });
}
class fruitsData {
  constructor(item) {
    this.name = item.name;
    this.price = item.price;
    this.image = item.image;
  }
}

module.exports = (getapidatafav);
