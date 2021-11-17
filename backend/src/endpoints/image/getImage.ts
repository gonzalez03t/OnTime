import { Request, Response } from 'express';
import s3, { s3Config } from '../../config/s3';

export default async function getImage(req: Request, res: Response) {
  const { key } = req.params;

  if (!key) {
    res.status(400).send('Missing key');
  } else {
    const readStream = s3
      .getObject({
        Bucket: s3Config.Bucket,
        Key: key,
      })
      .createReadStream();

    readStream.pipe(res);
  }
}
