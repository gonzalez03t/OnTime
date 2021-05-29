import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

/**
 * This is a class other defined entities will extend. It is just encapsulating
 * common properities so I don't have to redefine them for each single entity,
 * such as the id's, createdAt, updatedAt, etc.
 */
export abstract class BaseEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  // this will automatically trigger(!) on an update, which is kinda cool
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
