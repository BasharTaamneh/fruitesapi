"use strict";
const express = require("express");
const cors = require("cors");
const server = express();
server.use(cors());
server.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////////////////////////
const getapidatafav = require("./thiredApi");
server.get("/apidatafav", getapidatafav);
///////////////////////////////////////////////////
server.get("/getFav", getFavdata);
async function getFavdata(req, res) {
  let useremail = req.query.useremail;
  Favfruitsmodule.find({ email: useremail }, function (err, data) {
    if (err) {
      console.log(err.message);
    } else {
      res.send(data);
    }
  });
}
///////////////////////////////////////////////////

const FavfruitsSchema = new Schema({
  name: "string",
  price: "number",
  image: "string",
  email: "string",
});
const Favfruitsmodule = mongoose.model("Favfruits", FavfruitsSchema);
mongoose.connect(`${process.env.ATLAS}`, {
  useNewUrlParser: true,
});
///////////////////////////////////////////////////
server.post("/addFav", AddtoFav);
function AddtoFav(req, res) {
  let { email, image, price, name } = req.body;
  Favfruitsmodule.create({ email, image, price, name })
    .then(function (Favdata) {
        console.log({Favdata});
    })
    .catch(function (err) {
      console.log(err);
    });
}
///////////////////////////////////////////////////

server.delete("/deleteFav/:itemid", deletfav);
async function deletfav(req, res) {
  let itemid = req.params.itemid;
  let useremail = req.query.useremail;
  Favfruitsmodule.deleteOne(
    { _id: itemid, email: useremail },
    function (err, data) {
      if (err) {
        console.log(err.message);
      } else {
        Favfruitsmodule.find({ email: useremail }, function (err, data) {
          if (err) {
            console.log(err.message);
          } else {
            res.send(data);
          }
        });
      }
    }
  );
}
///////////////////////////////////////////////////
server.put("/updateFav/:itemid", updateFavdata);
async function updateFavdata(req, res) {
  let itemid = req.params.itemid;
  let useremail = req.query.useremail;
  let { image, price, name } = req.body;
  Favfruitsmodule.findByIdAndUpdate(
    itemid,
    { image, price, name },
    function (err, data) {
      if (err) {
        console.log(err.message);
      } else {
        Favfruitsmodule.find({ email: useremail }, function (err, data) {
          if (err) {
            console.log(err.message);
          } else {
            res.send(data);
          }
        });
      }
    }
  );
}
///////////////////////////////////////////////////
server.get("/", (req, res) => {
  res.send("routing");
});
server.get("/test", (req, res) => {
  res.send("all good");
});
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
