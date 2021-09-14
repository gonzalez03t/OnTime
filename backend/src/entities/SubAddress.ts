import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class SubAddress {
  @Property()
  name!: string;

  @Property()
  latitude!: number;

  @Property()
  longitude!: number;

  constructor(name: string, lat: number, long: number) {
    this.name = name;
    this.latitude = lat;
    this.longitude = long;
  }
}
