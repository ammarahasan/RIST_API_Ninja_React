const express = require("express");
const Ninja = require("../models/ninja");
const router = express.Router();

router.get("/ninjas", function (req, res, next) {
  // Ninja.find({})
  //   .then(function (ninjas) {
  //       res.send(ninjas);
  //   })
  //   .catch(next);

  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        spherical: true,
        maxDistance: 100000,
        distanceField: "dist.calculated",
      },
    },
  ])
    .then(function (results) {
      res.send(results);
    })
    .catch(next);
});

router.post("/ninjas", function (req, res, next) {
  // let ninja = new Ninja(req.body);
  // ninja.save();
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

router.put("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja);
      });
    })
    .catch(next);
});

router.delete("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id })
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

module.exports = router;
