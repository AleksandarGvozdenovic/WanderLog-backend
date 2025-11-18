import express from 'express';
import {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activityController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/trip/:tripId")
.get(getActivitiesForTrip)
.post(createActivity);

router.route("/:id")
.put(updateActivity)
.delete(deleteActivity);

export default router;

