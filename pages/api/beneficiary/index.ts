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

  // Adds a beneficiary to the beneficiary and testament collection
  if (req.method === 'POST') {
    const { beneficiaryAddress, dynamicVaultOwner } = req.body;

    if (!beneficiaryAddress) {
      return res.status(400).json({ message: 'No address' });
    }

    if (!dynamicVaultOwner) {
      return res.status(400).json({ message: 'No dynamicVaultOwner' });
    }

    const dynamicVault = await ModelDynamicVault.findOne({
      dynamicVaultOwner: dynamicVaultOwner,
    }).populate('testament');

    if (dynamicVault) {
      let beneficiary = await ModelBeneficiary.findOne({
        address: beneficiaryAddress,
      });
      if (beneficiary) {
        try {
          // populate the testament and add the new beneficiary
          await ModelBeneficiary.findOneAndUpdate(
            { address: beneficiaryAddress },
            { $push: { dynamicVaults: dynamicVault } }
          );
        } catch (error) {
          return res.status(400).json({ error });
        }
      } else {
        beneficiary = await new ModelBeneficiary({
          address: beneficiaryAddress,
          dynamicVaults: [dynamicVault._id],
        });
        try {
          await beneficiary.save();
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
      // add the new beneficiary to the testament
      const testament = dynamicVault.testament;
      if (testament) {
        const signatures = testament.signatures;

        const newSignatures = signatures.concat({
          address: beneficiaryAddress,
          signature: '',
        });

        try {
          await ModelTestament.findOneAndUpdate(
            { _id: testament._id },
            { signatures: newSignatures }
          );

          return res.status(200).json({ success: true });
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
    } else {
      return res.status(400).json({ message: 'No dynamicVault found' });
    }

    // if beneficiary update else create beneficiary
  }
}
