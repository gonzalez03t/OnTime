import { Embeddable, Enum, Property } from '@mikro-orm/core';
import { VerificationStatus } from '../../@types/enums';

/**
 * This is a utility, embeddable entity. This will be stored as JSON. The purpose of
 * wrapping something like an image in this type of entity is to have the status mainly -
 * images will be *hidden* unless verified. No imageUrl's should be sent to client
 * if not verified.
 */
@Embeddable()
export class Image {
  @Property()
  imageUrl!: string;

  @Enum(() => VerificationStatus)
  status = VerificationStatus.PENDING;

  /**
   * Sets the verification status to verified/approved. Admins will be responsible for this.
   */
  verifyImage() {
    this.status = VerificationStatus.VERIFIED;
  }

  /**
   * Sets the verification status to denied. Admins will be responsible for this.
   */
  rejectImage() {
    this.status = VerificationStatus.DENIED;
  }

  // TODO: change this after dev period :)
  isVerified() {
    return true;
    // return this.status === VerificationStatus.VERIFIED;
  }

  isAppropriate() {
    return this.status !== VerificationStatus.DENIED;
  }

  /**
   * This function will be used to *hide* the image until verified.
   */
  getImageUrl() {
    if (!this.isVerified()) {
      return null;
    } else {
      return this.imageUrl;
    }
  }

  setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  constructor(url: string) {
    this.imageUrl = url;
  }
}
