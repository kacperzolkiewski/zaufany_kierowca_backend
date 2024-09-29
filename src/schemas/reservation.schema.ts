import { TypeOf, boolean, object, string } from "zod";

const params = {
  params: object({
    reservationId: string(),
  }),
};

export const createReservationSchema = object({
  body: object({
    rideId: string({ required_error: "Reservation id is required" }),
  }),
});

export const getReservationSchema = object({
  ...params,
});

export const deleteReservationSchema = object({
  ...params,
});

export const updateReservationSchema = object({
  ...params,
  body: object({
    approved: boolean({ required_error: "Approved is required" }),
  }),
});

export type CreateReservationInput = TypeOf<
  typeof createReservationSchema
>["body"];
export type GetReservationInput = TypeOf<typeof getReservationSchema>["params"];
export type DeleteReservationInput = TypeOf<
  typeof deleteReservationSchema
>["params"];
export type UpdateReservationInput = TypeOf<typeof updateReservationSchema>;
