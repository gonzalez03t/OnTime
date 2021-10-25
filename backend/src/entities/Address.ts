import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export default class Address {
  //====== PROPERTIES ======//
  @Property()
  street!: string;

  @Property({ nullable: true })
  unit?: string;

  @Property()
  city!: string;

  @Property()
  stateProvince!: string;

  @Property()
  postalCode!: string;

  @Property()
  country!: string;

  //====== METHODS ======//
  toString() {
    let toArr = [this.street];

    if (this.unit) {
      toArr.push(this.unit);
    }

    // STREET, APT ###, CITY, STATE ZIP, COUNTRY
    return [
      ...toArr,
      this.city,
      `${this.stateProvince} ${this.postalCode}`,
      this.country,
    ].join(', ');
  }

  constructor(
    street: string,
    city: string,
    stateProvince: string,
    postalCode: string,
    country: string,
    unit?: string
  ) {
    this.street = street;
    this.unit = unit;
    this.city = city;
    this.stateProvince = stateProvince;
    this.postalCode = postalCode;
    this.country = country;
  }
}
