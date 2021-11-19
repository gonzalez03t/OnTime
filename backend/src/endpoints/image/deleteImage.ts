import { Request, Response } from 'express';
import s3, { s3Config } from '../../config/s3';

export default async function deleteImage(req: Request, res: Response) {
  const { key } = req.params;

  console.log(key);

  if (!key) {
    res.status(400).send('Missing key');
  } else {
    await s3
      .deleteObject({
        Bucket: s3Config.Bucket,
        Key: key,
      })
      .promise()
      .then(() => res.sendStatus(200))
      .catch((err: any) => res.status(500).send(err));
  }
}
