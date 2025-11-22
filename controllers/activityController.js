import Activity from "../models/Activity.js";
import Trip from "../models/Trip.js";

export const getActivitiesForTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findOne({ _id: tripId, user: req.user._id });
    if (!trip) {
      res.status(404);
      throw new Error("Trip not found or not owned by user");
    }

    const activities = await Activity.find({
      trip: tripId,
      user: req.user._id,
    }).sort({ date: 1 });

    res.json(activities);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req, res, next) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("trip");

    if (!activity) {
      res.status(404);
      throw new Error("Activity not found");
    }

    res.json(activity);
  } catch (error) {
    next(error);
  }
};

export const createActivity = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const {
      name,
      location,
      price,
      currency,
      date,
      isCompleted,
      rating,
      comment,
    } = req.body;

    const trip = await Trip.findOne({ _id: tripId, user: req.user._id });
    if (!trip) {
      res.status(404);
      throw new Error("Trip not found or not owned by user");
    }

    if (!name) {
      res.status(400);
      throw new Error("Activity name is required");
    }

    const activity = await Activity.create({
      trip: tripId,
      user: req.user._id,
      name,
      location,
      price,
      currency,
      date,
      isCompleted,
      rating,
      comment,
    });

    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
};

export const updateActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!activity) {
      res.status(404);
      throw new Error("Activity not found");
    }

    const updates = req.body;
    Object.assign(activity, updates);

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!activity) {
      res.status(404);
      throw new Error("Activity not found");
    }

    await activity.deleteOne();
    res.json({ message: "Activity removed" });
  } catch (error) {
    next(error);
  }
};
