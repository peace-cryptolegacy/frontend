import { model, models, Schema } from 'mongoose';

const BeneficiarySchema = new Schema({
  address: { type: String, required: true, unique: true },
  dynamicVaults: [{ type: Schema.Types.ObjectId, ref: 'DynamicVault' }],
});

const ModelBeneficiary =
  models.Beneficiary || model('Beneficiary', BeneficiarySchema);

export default ModelBeneficiary;
