import express from "express";

import {
  createRideHandler,
  deleteRideHandler,
  getHistoricalRidesHandler,
  getRideHandler,
  getRidePassengersHandler,
  getRidesHandler,
  searchRidesByAddressHandler,
  updateRideHandler,
} from "../controllers/ride.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createRideSchema,
  deleteRideSchema,
  getRidePassengersSchema,
  getRideSchema,
  searchRidesByAddressSchema,
  updateRideSchema,
} from "../schemas/ride.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/search")
  .get(validate(searchRidesByAddressSchema), searchRidesByAddressHandler);

router.route("/history").get(getHistoricalRidesHandler);

router
  .route("/:rideId/passengers")
  .get(validate(getRidePassengersSchema), getRidePassengersHandler);

router
  .route("/:rideId")
  .get(validate(getRideSchema), getRideHandler)
  .patch(validate(updateRideSchema), updateRideHandler)
  .delete(validate(deleteRideSchema), deleteRideHandler);

router
  .route("/")
  .post(validate(createRideSchema), createRideHandler)
  .get(getRidesHandler);

export default router;
