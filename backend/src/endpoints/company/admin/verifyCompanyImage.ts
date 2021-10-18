import { Request, Response } from 'express';
import { em } from '../../..';
import { VerificationStatus } from '../../../../@types/enums';
import { Company } from '../../../entities/Company';

// TODO: company profile image vs banner image
export default async function verifyCompanyImage(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.params;

  if (!Object.keys(VerificationStatus).includes(status)) {
    res.status(400).send(`${status} is not a valid status`);
  } else {
    const company = await em.findOne(Company, { id });

    if (company && company.image) {
      const image = company.image;

      image.setStatus(status as VerificationStatus);

      await em
        .persistAndFlush(company)
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err));
    } else if (company && !company.image) {
      res.status(400).send('Company has no image');
    } else {
      res.status(400).send('Could not find target company');
    }
  }
}
