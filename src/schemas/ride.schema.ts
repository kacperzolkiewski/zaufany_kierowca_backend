import { TypeOf, array, number, object, string } from "zod";

export const createRideSchema = object({
  body: object({
    originAddress: object({
      name: string(),
      latitude: number(),
      longitude: number(),
    }),
    destinationAddress: object({
      name: string(),
      latitude: number(),
      longitude: number(),
    }),
    startTime: string({ required_error: "Start time is required" }),
    endTime: string({ required_error: "End time is required" }),
    price: number({ required_error: "Price is required" }),
    availableSeats: number({ required_error: "Available seats are required" }),
    distanceInKm: number(),
    preferences: array(string()).optional(),
  }),
});

const params = {
  params: object({
    rideId: string(),
  }),
};

export const getRidePassengersSchema = object({
  ...params,
});

export const getRideSchema = object({
  ...params,
});

export const deleteRideSchema = object({
  ...params,
});

export const updateRideSchema = object({
  ...params,
  body: object({
    orginAddress: string(),
    destinationAddress: string(),
    startTime: string(),
    endTime: string(),
    price: number(),
    preferences: array(string()),
  }).partial(),
});

export const searchRidesByAddressSchema = object({
  query: object({
    origin: string({ required_error: "Pole origin jest wymagane" }),
    destination: string({ required_error: "Pole destination jest wymagane" }),
    startTime: string(),
  }),
});

export type CreateRideInput = TypeOf<typeof createRideSchema>["body"];
export type GetRideInput = TypeOf<typeof getRideSchema>["params"];
export type UpdateRideInput = TypeOf<typeof updateRideSchema>;
export type DeleteRideInput = TypeOf<typeof deleteRideSchema>["params"];
export type SearchRidesQuery = TypeOf<
  typeof searchRidesByAddressSchema
>["query"];
