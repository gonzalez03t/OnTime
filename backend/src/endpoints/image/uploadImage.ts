import { Request, Response } from 'express';
import s3, { s3Config } from '../../config/s3';

export default async function uploadImage(req: Request, res: Response) {
  const { key, fileContents, type } = req.body;

  await s3
    .upload({
      Bucket: s3Config.Bucket,
      Body: Buffer.from(fileContents, 'base64'),
      Key: key,
      ContentType: type,
    })
    .promise()
    .then((data) => res.status(200).json({ ...data }))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
}
