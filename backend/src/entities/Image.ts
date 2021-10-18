import { Embeddable, Enum, Property } from '@mikro-orm/core';
import { VerificationStatus } from '../../@types/enums';

/**
 * This is a utility, embeddable entity. This will be stored as JSON. The purpose of
 * wrapping something like an image in this type of entity is to have the status mainly -
 * images will be *hidden* unless verified. TODO: add 'CLIENT_VERIFIED' to enum
 */
@Embeddable()
export class Image {
  /**
   * this refers to the key of the object in the S3 bucket
   */
  @Property()
  s3Key!: string;

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

  setStatus(status: VerificationStatus) {
    if (status === VerificationStatus.VERIFIED) {
      this.verifyImage();
    } else if (status === VerificationStatus.DENIED) {
      this.rejectImage();
    }
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
  getImageKey() {
    if (!this.isVerified()) {
      return null;
    } else {
      return this.s3Key;
    }
  }

  setImageKey(s3Key: string) {
    this.s3Key = s3Key;
  }

  constructor(s3Key: string) {
    this.s3Key = s3Key;
  }
}
