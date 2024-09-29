import { TypeOf, number, object, string } from "zod";

export const createOpinionSchema = object({
  body: object({
    receiverId: string({ required_error: "Receiver id is required" }),
    comment: string({ required_error: "Comment is required" }),
    stars: number({ required_error: "Number of stars is required" }),
  }),
});

export const getOpinionsSchema = object({
  params: object({
    userId: string(),
  }),
});

export const deleteOpinionSchema = object({
  params: object({
    opinionId: string(),
  }),
});

export type CreateOpinionInput = TypeOf<typeof createOpinionSchema>["body"];
export type GetOpinionsInput = TypeOf<typeof getOpinionsSchema>["params"];
export type DeleteOpinionInput = TypeOf<typeof deleteOpinionSchema>["params"];
