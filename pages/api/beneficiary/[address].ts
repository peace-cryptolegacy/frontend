import dbConnect from 'lib/mongodb';
import ModelBeneficiary from 'mongoDB/models/beneficiary';
import ModelDynamicVault from 'mongoDB/models/dynamicVault';
import ModelTestament from 'mongoDB/models/testament';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
  } catch (error) {
    return res.status(500).json({ error });
  }

  if (req.method === 'GET') {
    const { address } = req.query;

    try {
      const beneficiary = await ModelBeneficiary.findOne({
        address: address,
      }).populate({
        path: 'dynamicVaults',
        model: ModelDynamicVault,
        populate: { path: 'testament', model: ModelTestament },
      });

      return res.status(200).json({ beneficiary });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
