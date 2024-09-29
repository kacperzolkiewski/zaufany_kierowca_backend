import { NextFunction, Request, Response } from "express";
import {
  CreateOpinionInput,
  DeleteOpinionInput,
  GetOpinionsInput,
} from "../schemas/opinion.schema";
import {
  createOpinion,
  findGivedOpinions,
  findOpinionById,
  findReceivedOpinions,
} from "../services/opinion.service";
import { findUserById } from "../services/user.service";
import AppError from "../utils/appError";

export const getReceivedOpinionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);

    if (!user) {
      return next(new AppError(404, "User with that ID not found"));
    }

    const opinions = await findReceivedOpinions(user.id);

    res.status(200).json({
      status: "success",
      data: {
        opinions,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUserOpinionsHandler = async (
  req: Request<GetOpinionsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(req.params.userId);

    if (!user) {
      return next(new AppError(404, "User with that ID not found"));
    }

    const opinions = await findReceivedOpinions(user.id);

    res.status(200).json({
      status: "success",
      data: {
        opinions,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getGivedOpinionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);

    if (!user) {
      return next(new AppError(404, "User with that ID not found"));
    }

    const opinions = await findGivedOpinions(user.id);

    res.status(200).json({
      status: "success",
      data: {
        opinions,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createOpinionHandler = async (
  req: Request<{}, {}, CreateOpinionInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const giver = await findUserById(res.locals.user.id as string);
    const receiver = await findUserById(req.body.receiverId);
    const { comment, stars } = req.body;

    if (!giver) {
      return next(new AppError(404, "User with that ID not found"));
    }

    if (!receiver) {
      return next(new AppError(404, "User with that ID not found"));
    }

    const opinion = await createOpinion({ comment, stars }, giver, receiver);

    res.status(201).json({
      status: "success",
      data: {
        opinion,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteOpinionHandler = async (
  req: Request<DeleteOpinionInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const opinion = await findOpinionById(req.params.opinionId);

    if (!opinion) {
      return next(new AppError(404, "Opinion with that ID not found"));
    }

    await opinion.remove();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
