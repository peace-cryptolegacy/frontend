import { model, models, Schema } from 'mongoose';

const TestamentSchema = new Schema({
  signatures: [
    {
      address: { type: String, required: true },
      signature: { type: String },
      message: { type: String },
    },
  ],
  protectedTokens: [String],
});

const ModelTestament = models.Testament || model('Testament', TestamentSchema);

export default ModelTestament;
