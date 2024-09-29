import { TypeOf, number, object, string } from "zod";

export const createAddressSchema = object({
  body: object({
    name: string(),
    latitude: number(),
    longitude: number(),
  }),
});

const params = {
  params: object({
    addressId: string(),
  }),
};

export const getAddressSchema = object({
  ...params,
});

export const deleteAddressSchema = object({
  ...params,
});

export type CreateAddressInput = TypeOf<typeof createAddressSchema>["body"];
export type GetAddressInput = TypeOf<typeof getAddressSchema>["params"];
export type DeleteAddressInput = TypeOf<typeof deleteAddressSchema>["params"];
