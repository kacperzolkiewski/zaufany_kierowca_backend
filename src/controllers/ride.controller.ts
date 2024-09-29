import { NextFunction, Request, Response } from "express";
import { Between, ILike, LessThan, MoreThanOrEqual, Not } from "typeorm";
import { Reservation } from "../entities/reservation.entity";
import { firebase } from "../firebase";
import {
  CreateRideInput,
  DeleteRideInput,
  GetRideInput,
  SearchRidesQuery,
  UpdateRideInput,
} from "../schemas/ride.schema";
import { findAddressOrCreateNewOne } from "../services/address.service";
import { createRide, findRideById, findRides } from "../services/ride.service";
import { findUserById } from "../services/user.service";
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/data-source";

export const createRideHandler = async (
  req: Request<{}, {}, CreateRideInput>,
  res: Response,
  next: NextFunction
) => {
  const {
    originAddress: startAddress,
    destinationAddress: endAddres,
    startTime,
    endTime,
    price,
    distanceInKm,
    availableSeats,
    preferences,
  } = req.body;

  try {
    const user = await findUserById(res.locals.user.id as string);
    const originAddress = await findAddressOrCreateNewOne(startAddress);
    const destinationAddress = await findAddressOrCreateNewOne(endAddres);

    const ride = await createRide(
      { startTime, endTime, price, distanceInKm, availableSeats, preferences },
      user!,
      originAddress,
      destinationAddress
    );

    res.status(201).json({
      status: "success",
      data: {
        ride,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getRideHandler = async (
  req: Request<GetRideInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const ride = await findRideById(req.params.rideId);

    if (!ride) {
      return next(new AppError(404, "Ride with that ID not found"));
    }

    res.status(200).json({
      status: "success",
      data: {
        ride,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getRidesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);

    const rides = await findRides(
      {
        user: { id: user?.id },
        startTime: MoreThanOrEqual(new Date().toISOString()),
      },
      {},
      {
        originAddress: true,
        destinationAddress: true,
        user: true,
        reservations: true,
      },
      { startTime: "ASC" }
    );

    res.status(200).json({
      status: "success",
      data: {
        rides,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getRidePassengersHandler = async (
  req: Request<{ rideId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const ride = await findRideById(req.params.rideId);

    if (!ride) {
      return next(new AppError(404, "Ride with that ID not found"));
    }

    const passengers = ride.reservations.map((reservation) => reservation.user);

    res.status(200).json({
      status: "success",
      data: {
        passengers,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getHistoricalRidesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);

    const rides = await findRides(
      { user: { id: user?.id }, startTime: LessThan(new Date().toISOString()) },
      {},
      {
        originAddress: true,
        destinationAddress: true,
        user: true,
        reservations: true,
      },
      { startTime: "DESC" }
    );

    res.status(200).json({
      status: "success",
      data: {
        rides,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateRideHandler = async (
  req: Request<UpdateRideInput["params"], {}, UpdateRideInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const ride = await findRideById(req.params.rideId);

    if (!ride) {
      return next(new AppError(404, "Ride with that ID not found"));
    }

    Object.assign(ride, req.body);

    const updatedRide = await ride.save();

    res.status(200).json({
      status: "success",
      data: {
        ride: updatedRide,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const searchRidesByAddressHandler = async (
  req: Request<{}, {}, {}, SearchRidesQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { origin, destination, startTime } = req.query;

    const nextDay = new Date(startTime);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const rides = await findRides(
      {
        originAddress: { name: ILike(`%${origin}%`) },
        destinationAddress: { name: ILike(`%${destination}%`) },
        startTime: Between(startTime, nextDay.toISOString()),
        user: { id: Not(res.locals.user.id) },
      },
      {},
      {
        originAddress: true,
        destinationAddress: true,
        user: true,
        reservations: true,
      },
      { startTime: "ASC" }
    );

    res.status(200).json({
      status: "success",
      data: {
        rides,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRideHandler = async (
  req: Request<DeleteRideInput, {}, {}, { reason: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);
    const ride = await findRideById(req.params.rideId);
    const reason = req.query.reason;

    if (!user) {
      return next(new AppError(404, "User with that ID not found"));
    }

    if (!ride) {
      return next(new AppError(404, "Ride with that ID not found"));
    }

    await AppDataSource.manager.transaction(
      async (transactionEntityManager) => {
        const userFCMTokens = ride.reservations.map(
          (reservation) => reservation.user.firebaseToken
        );

        if (userFCMTokens.length !== 0) {
          await transactionEntityManager.delete(Reservation, { ride: ride });
          await firebase.messaging().sendEachForMulticast({
            tokens: userFCMTokens,
            data: {
              type: "ride_cancelled",
              userName: user.name,
              originAddress: ride.originAddress.name,
              destinationAddress: ride.destinationAddress.name,
              reason,
            },
          });
        }

        await transactionEntityManager.remove(ride);
      }
    );

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
