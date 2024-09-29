import express from "express";

import {
  createOpinionHandler,
  deleteOpinionHandler,
  getGivedOpinionsHandler,
  getReceivedOpinionsHandler,
  getUserOpinionsHandler,
} from "../controllers/opinion.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createOpinionSchema,
  deleteOpinionSchema,
  getOpinionsSchema,
} from "../schemas/opinion.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/received/:userId")
  .get(validate(getOpinionsSchema), getUserOpinionsHandler);

router.route("/received").get(getReceivedOpinionsHandler);
router.route("/gived").get(getGivedOpinionsHandler);

router
  .route("/:opinionId")
  .delete(validate(deleteOpinionSchema), deleteOpinionHandler);

router.route("/").post(validate(createOpinionSchema), createOpinionHandler);

export default router;
