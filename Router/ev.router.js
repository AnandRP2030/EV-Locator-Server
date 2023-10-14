const evRouter = require("express").Router();
const {
  createStation,
  getAllStations,
  getStationById,
  getStationsByLocation,
  deleteStationById,
  bookSlot
} = require("../Controllers/evController.js");
evRouter.get("/", (req, res) => {
  res.send("ev router works");
});

evRouter.post("/create", createStation);
evRouter.get("/all-stations", getAllStations);
evRouter.get("/station-id/:id", getStationById);
evRouter.get("/location/:location", getStationsByLocation);
evRouter.delete("/delete/:id", deleteStationById);
evRouter.patch("/book-slot/:id", bookSlot);
module.exports = { evRouter };
