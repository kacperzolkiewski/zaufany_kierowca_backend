import bcrypt from "bcryptjs";
import crypto from "crypto";
import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Opinion } from "./opinion.entity";
import { Reservation } from "./reservation.entity";
import { Ride } from "./ride.entity";

export enum RoleEnumType {
  USER = "user",
  ADMIN = "admin",
}

@Entity("users")
export class User extends Model {
  @Column()
  name: string;

  @Index("email_index")
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({ type: "text", default: "" })
  firebaseToken: string;

  @Column({
    type: "enum",
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType.USER;

  @Column({ type: "text", nullable: true })
  imageUrl: string;

  @Column({ type: "text", nullable: true })
  phone: string | null;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "text", nullable: true })
  car: string | null;

  @Column({ type: "timestamp", nullable: true })
  birthDate: string | null;

  @Column({ type: "int", default: 0 })
  kilometersTraveled: number;

  @OneToMany(() => Opinion, (opinion) => opinion.giver)
  opinionsGiven: Opinion[];

  @OneToMany(() => Opinion, (opinion) => opinion.receiver)
  opinionsReceived: Opinion[];

  @OneToMany(() => Ride, (ride) => ride.user)
  rides: Ride[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @Column({
    default: false,
  })
  verified: boolean;

  @Index("verificationCode_index")
  @Column({ type: "text", nullable: true, unique: true })
  verificationCode!: string | null;

  @Index("passwordResetToken_index")
  @Column({ type: "text", nullable: true, unique: true })
  passwordResetToken: string | null;

  @Column({ type: "timestamp", nullable: true })
  passwordResetAt: Date | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  static createVerificationCode() {
    // const verificationCode = crypto.randomBytes(32).toString("hex");
    let verificationCode = "";

    for (let i = 0; i < 5; i++) {
      verificationCode += Math.floor(Math.random() * 10);
    }

    const hashedVerificationCode = crypto
      .createHash("sha256")
      .update(verificationCode)
      .digest("hex");

    return { verificationCode, hashedVerificationCode };
  }
}
