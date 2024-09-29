import { NextFunction, Request, Response } from "express";
import { CreateAddressInput } from "../schemas/address.schema";
import { createAddress } from "../services/address.service";

export const createAddressHandler = async (
  req: Request<{}, {}, CreateAddressInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = await createAddress(req.body);

    res.status(201).json({
      status: "success",
      data: {
        address,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
