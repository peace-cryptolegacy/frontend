import dbConnect from 'lib/mongodb';
import ModelBeneficiary from 'mongoDB/models/beneficiary';
import ModelDynamicVault from 'mongoDB/models/dynamicVault';
import ModelTestament from 'mongoDB/models/testament';
import { NextApiRequest, NextApiResponse } from 'next';
import { Address } from 'wagmi';

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
    const { dynamicvaultowner: dynamicVaultOwner } = req.query;
    try {
      const testamentSignatures = await ModelDynamicVault.findOne({
        dynamicVaultOwner: dynamicVaultOwner,
      }).populate('testament');

      return res.status(200).json({ testamentSignatures });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  if (req.method === 'POST') {
    type Props = {
      dynamicVaultOwner: Address;
      beneficiaries: { address: Address; signature: string }[];
    };
    const { dynamicVaultOwner, beneficiaries }: Props = req.body;

    if (!beneficiaries) {
      return res.status(400).json({ message: 'No beneficiaries' });
    }

    const testament = await new ModelTestament({
      signatures: beneficiaries,
    });
    try {
      await testament.save();
    } catch (error) {
      return res.status(400).json({ error });
    }

    let dynamicVault = await ModelDynamicVault.findOne({
      dynamicVaultOwner: dynamicVaultOwner,
    });

    if (dynamicVault) {
      try {
        await ModelDynamicVault.findOneAndUpdate(
          {
            dynamicVaultOwner: dynamicVaultOwner,
          },
          {
            $push: {
              testament: testament,
            },
          }
        );
      } catch (error) {
        return res.status(400).json({ error });
      }
    } else {
      dynamicVault = await new ModelDynamicVault({
        dynamicVaultOwner: dynamicVaultOwner,
        testament: testament,
      });

      try {
        await dynamicVault.save();
      } catch (error) {
        return res.status(400).json({ error });
      }
    }

    beneficiaries.forEach(async (beneficiary) => {
      try {
        const beneficiaryMap = await ModelBeneficiary.findOne({
          address: beneficiary.address,
        });
        if (beneficiaryMap) {
          await beneficiaryMap.update({
            $push: {
              dynamicVaults: dynamicVault,
            },
          });
        } else {
          const newBeneficiaryMap = await new ModelBeneficiary({
            address: beneficiary.address,
            dynamicVaults: [dynamicVault],
          });
          await newBeneficiaryMap.save();
        }
      } catch (error) {
        return res.status(400).json({ error });
      }
    });

    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    const { dynamicvaultowner: dynamicVaultOwner, beneficiary } = req.query;

    try {
      const dynamicVault = await ModelDynamicVault.findOne({
        dynamicVaultOwner: dynamicVaultOwner,
      });

      await ModelTestament.findOneAndUpdate(
        {
          _id: dynamicVault?.testament,
        },
        {
          $pull: {
            $elemMatch: {
              signatures: {
                address: beneficiary,
              },
            },
          },
        }
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  if (req.method === 'PUT') {
    type Props = {
      testamentId: string;
      beneficiaryAddress: Address;
      signature: string;
    };
    const { testamentId, beneficiaryAddress, signature }: Props = req.body;

    try {
      await ModelTestament.findOneAndUpdate(
        {
          _id: testamentId,
          'signatures.address': beneficiaryAddress,
        },
        {
          $set: {
            'signatures.$.signature': signature,
          },
        },
        { upsert: true }
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
