import { Schema, model } from 'mongoose';
import { handleUpdateContact, saveContactError } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post('save', saveContactError);

contactSchema.pre('findOneAndUpdate', handleUpdateContact);
contactSchema.post('findOneAndUpdate', saveContactError);

const Contact = model('contact', contactSchema);

export default Contact;
