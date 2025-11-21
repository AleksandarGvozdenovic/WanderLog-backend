import Activity from "../models/Activity.js";
import Trip from "../models/Trip.js";

export const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({
      createdAt: -1
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

export const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    res.json(trip);
  } catch (error) {
    next(error);
  }
};

export const createTrip = async (req, res, next) => {
  try {
    const { title, destination, startDate, endDate, budget } = req.body;

    if (!title || !destination || !startDate || !endDate) {
      res.status(400);
      throw new Error("Please provide title, destination, start and end date");
    }

    const trip = await Trip.create({
      user: req.user._id,
      title,
      destination,
      startDate,
      endDate,
      budget
    });

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

export const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    const { title, destination, startDate, endDate, budget } = req.body;

    if (title !== undefined) trip.title = title;
    if (destination !== undefined) trip.destination = destination;
    if (startDate !== undefined) trip.startDate = startDate;
    if (endDate !== undefined) trip.endDate = endDate;
    if (budget !== undefined) trip.budget = budget;

    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } catch (error) {
    next(error);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!trip) {
      res.status(404);
      throw new Error("Trip not found");
    }

    await Activity.deleteMany({ trip: trip._id, user: req.user._id });

    await trip.deleteOne();
    res.json({ message: "Trip and related activities removed" });
  } catch (error) {
    next(error);
  }
};
