import { Request, Response } from 'express';
import s3, { s3Config } from '../../config/s3';

export default async function deleteImage(req: Request, res: Response) {
  const { key } = req.body;

  await s3
    .deleteObject({
      Bucket: s3Config.Bucket,
      Key: key,
    })
    .promise()
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
}
