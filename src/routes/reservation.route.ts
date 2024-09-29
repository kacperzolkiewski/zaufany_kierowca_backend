import express from "express";
import {
  createReservationHandler,
  deleteReservationHandler,
  getHistoricalReservationsHandler,
  getReservationHandler,
  getReservationsHandler,
  updateReservationHandler,
} from "../controllers/reservation.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createReservationSchema,
  deleteReservationSchema,
  getReservationSchema,
  updateReservationSchema,
} from "../schemas/reservation.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router.route("/history").get(getHistoricalReservationsHandler);

router
  .route("/:reservationId")
  .get(validate(getReservationSchema), getReservationHandler)
  .patch(validate(updateReservationSchema), updateReservationHandler)
  .delete(validate(deleteReservationSchema), deleteReservationHandler);

router
  .route("/")
  .post(validate(createReservationSchema), createReservationHandler)
  .get(getReservationsHandler);

export default router;
