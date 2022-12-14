import dbConnect from 'lib/mongodb';
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

  if (req.method === 'POST') {
    const { dynamicVaultOwner, newProtectedTokens } = req.body;

    try {
      const dynamicVault = await ModelDynamicVault.findOne({
        dynamicVaultOwner: dynamicVaultOwner,
      })
        .populate({ path: 'testament', model: ModelTestament })
        .exec();

      await ModelTestament.findOneAndUpdate(
        {
          _id: dynamicVault?.testament,
        },
        {
          $push: {
            protectedTokens: newProtectedTokens,
          },
        }
      );
      return res.status(200).json({ dynamicVault });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
