import { Embeddable, Enum, Property } from '@mikro-orm/core';
import { VerificationStatus } from '../../@types/enums';

@Embeddable()
export class Image {
  @Property()
  imageUrl!: string;

  @Enum(() => VerificationStatus)
  status = VerificationStatus.PENDING;

  isVerified() {
    return this.status === VerificationStatus.VERIFIED;
  }

  isAppropriate() {
    return this.status !== VerificationStatus.DENIED;
  }

  constructor(url: string) {
    this.imageUrl = url;
  }
}
