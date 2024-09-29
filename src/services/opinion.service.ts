import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from "typeorm";
import { Opinion } from "../entities/opinion.entity";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../utils/data-source";

const opinionRepository = AppDataSource.getRepository(Opinion);

export const createOpinion = async (
  input: Partial<Opinion>,
  giver: User,
  receiver: User
) => {
  return await opinionRepository.save(
    opinionRepository.create({
      ...input,
      giver,
      receiver,
    })
  );
};

export const findOpinionById = async (opinionId: string) => {
  return await opinionRepository.findOne({
    where: { id: opinionId },
  });
};

export const findReceivedOpinions = async (receiverId: string) => {
  return await findOpinions({
    where: {
      receiver: { id: receiverId },
    },
    relations: {
      receiver: true,
      giver: true,
    },
  });
};

export const findGivedOpinions = async (giverId: string) => {
  return await findOpinions({
    where: {
      giver: { id: giverId },
    },
    relations: {
      receiver: true,
      giver: true,
    },
  });
};

export const findOpinions = async ({
  where = {},
  select = {},
  relations = {},
  order,
}: {
  where: FindOptionsWhere<Opinion>;
  select?: FindOptionsSelect<Opinion>;
  relations?: FindOptionsRelations<Opinion>;
  order?: FindOptionsOrder<Opinion>;
}) => {
  return await opinionRepository.find({
    where,
    select,
    relations,
    order,
  });
};
