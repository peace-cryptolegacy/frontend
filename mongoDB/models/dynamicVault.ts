import { model, models, Schema } from 'mongoose';

const DynamicVaultSchema = new Schema({
  dynamicVaultOwner: { type: String, required: true, unique: true },
  testament: { type: Schema.Types.ObjectId, ref: 'Testament' },
});

const ModelDynamicVault =
  models.DynamicVault || model('DynamicVault', DynamicVaultSchema);

export default ModelDynamicVault;
