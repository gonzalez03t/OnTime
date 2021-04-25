import { SerializedPrimaryKey, PrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

// TODO: determine if this is necessary

export class DoctorInformation {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  // @ManyToMany()
  // department!: Department

  // Property
  // office
}
