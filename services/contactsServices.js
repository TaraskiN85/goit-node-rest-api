import Contact from '../models/Contact.js';

export const listContacts = (filter = {}, query = {}) =>
  Contact.find(filter, 'name phone', query);

export const getOneContact = (filter) => Contact.findOne(filter);

export const addContact = (data) => Contact.create(data);

export const updateOneContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const removeOneContact = (filter) => Contact.findOneAndDelete(filter);
