import { Column, Entity, OneToMany, Unique } from "typeorm";
import Model from "./model.entity";
import { Ride } from "./ride.entity";

@Entity("addresses")
@Unique(["latitude", "longitude"])
export class Address extends Model {
  @Column()
  name: string;

  @Column({ type: "float" })
  latitude: number;

  @Column({ type: "float" })
  longitude: number;

  @OneToMany(() => Ride, (ride) => ride.originAddress)
  originRides: Ride[];

  @OneToMany(() => Ride, (ride) => ride.destinationAddress)
  destinationRides: Ride[];
}
