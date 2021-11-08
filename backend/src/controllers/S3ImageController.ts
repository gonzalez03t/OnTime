import { Router } from 'express';
import deleteImage from '../endpoints/image/deleteImage';
import getImage from '../endpoints/image/getImage';
import uploadImage from '../endpoints/image/uploadImage';

/**
 * This is really an s3 controller, not an Image entity controller
 */
const router = Router();

router.get('/:key', getImage);

router.post('/', uploadImage);
router.delete('/', deleteImage);

export const S3ImageController = router;
