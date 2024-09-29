import { Address } from "../entities/address.entity";
import { AppDataSource } from "../utils/data-source";

const addressRepository = AppDataSource.getRepository(Address);

interface AddressInput {
  name: string;
  latitude: number;
  longitude: number;
}

export const createAddress = async (input: Partial<Address>) => {
  return await addressRepository.save(addressRepository.create({ ...input }));
};

export const findAddressOrCreateNewOne = async (
  address: AddressInput
) => {
  const foundAddress = await findAddressByDimensions(
    address.name,
    address.latitude,
    address.longitude
  );

  if (foundAddress) return foundAddress;

  return await createAddress(address);
};

export const findAddressByDimensions = async (
  name: string,
  latitude: number,
  longitude: number
) => {
  return await addressRepository.findOneBy({ name, latitude, longitude });
};
