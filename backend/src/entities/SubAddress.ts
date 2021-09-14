import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class SubAddress {
  @Property()
  label!: string;

  @Property()
  latitude!: number;

  @Property()
  longitude!: number;

  constructor(label: string, lat: number, long: number) {
    this.label = label;
    this.latitude = lat;
    this.longitude = long;
  }
}
