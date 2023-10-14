const express = require("express");
const evRouter = express.Router();
const { EvModel } = require("../Models/ev.model.js");

const getAllStationsFun = async () => {
  const allStations = await EvModel.find({});
  return allStations;
};

const createStation = async (req, res) => {
  try {
    const { stationName, location, availablePorts, totalPorts, pricePerHour } =
      req.body;
    if (
      !stationName ||
      !location ||
      !availablePorts ||
      !totalPorts ||
      !pricePerHour
    ) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    const newEvStation = new EvModel({
      stationName,
      location,
      availablePorts,
      totalPorts,
      pricePerHour,
    });
    await newEvStation.save();
    res.status(201).send({ message: "New Station created successfully." });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const getAllStations = async (req, res) => {
  try {
    const allEvStations = await getAllStationsFun();
    res.status(200).send({ data: allEvStations });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const getStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const evStation = await EvModel.findById(id);
    if (evStation) {
      return res.status(200).send({ data: evStation });
    } else {
      return res.status(404).send({ message: "Station not found" });
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const getStationsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    if (location === "") {
      const allStations = await getAllStations();
      return res.status(200).send({ data: allStations });
    }
    const evStation1 = await EvModel.find({ location });
    const evStation2 = await EvModel.find({ stationName: location });
    const evStations = [...evStation1, ...evStation2];
    if (evStations) {
      return res.status(200).send({ data: evStations });
    } else {
      return res
        .status(404)
        .send({ message: "EV Stations are Not available in this location" });
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const deleteStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const evStation = await EvModel.findByIdAndDelete(id);
    if (evStation) {
      return res
        .status(200)
        .send({ message: "Station deleted successfully", data: evStation });
    } else {
      return res.status(404).send({ message: "EV Station not found" });
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

const bookSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const evStation = await EvModel.findById(id);
    console.log("iid", evStation);
    if (!evStation) {
      return res.status(404).send({ message: "EV Station Not Found" });
    }
    if (evStation.availablePorts > 0) {
      evStation.availablePorts--;
      await evStation.save();
      return res.status(200).send({
        data: evStation,
        message: `${evStation.stationName} Station Booked Successfully.`,
      });
    } else {
      return res
        .status(400)
        .send({
          message: `${evStation.stationName} Station is Not Available Right Now.`,
        });
    }
  } catch (error) {
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  createStation,
  getAllStations,
  getStationById,
  getStationsByLocation,
  deleteStationById,
  bookSlot,
};
