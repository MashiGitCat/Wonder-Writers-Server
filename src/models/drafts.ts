import { model, Schema, Document, Types } from 'mongoose';

interface IDraft extends Document {
  userId: Types.ObjectId;
  title: string;
  author: string;
  imagePosition: 'top' | 'right';
}

const DraftSchema: Schema<IDraft> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imagePosition: { type: String, enum: ['top', 'right'], required: true },
});

const Draft = model<IDraft>('Draft', DraftSchema);
export default Draft;
