const express = require("express");
const movieModel = require("./movieModel");
const router = express.Router();

//creating movie data

module.exports = router.post("/movie", async (req, res) => {
  try {
    let data = req.body;
    const { movieName, type, rating } = data;
    let standard = [],
      premium = [];
    for (let i = 20; i < 80; i++) {
      standard.push({ _id: i, booked: false });
    }
    for (let i = 0; i < 20; i++) {
      premium.push({ _id: i, booked: false });
    }

    const movieData = {
      movieName,
      type,
      rating,
      date: new Date().toLocaleDateString(),
      standard,
      premium,
    };
    const movie = await movieModel.create(movieData);
    return res.status(201).send(movie);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: err.message });
  }
});


// get all movie from db

module.exports = router.get("/movielist", async (req, res) => {
  try {
    const movies = await movieModel.find();
    return res.status(200).send(movies);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});


// get movie by id

module.exports = router.get("/movie/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const seats = await movieModel.findById({ _id: id });

    return res.status(200).send(seats);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});


//  update the status after booked seat
module.exports = router.put("/movie/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    const { seatState, cat } = data;
    const seats = await movieModel.findById({ _id: id });
    let seatCategory;
    if (cat === "standard") {
      seatCategory = seats.standard;
    } else {
      seatCategory = seats.premium;
    }
    for (let i = 0; i <= seatState.length - 1; i++) {
      let data = seatCategory.find((e) => e._id === seatState[i]);
      data.booked = true;
    }
    seats.save();

    return res.status(200).send({ msg: "done" });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
});
