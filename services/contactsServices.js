import Contact from '../models/Contact.js';

export const listContacts = () => Contact.find();

export const getContactById = (_id) => Contact.findById({ _id });

export const addContact = (data) => Contact.create(data);

export const updateById = (id, data) => Contact.findByIdAndUpdate(id, data);

export const removeById = (id) => Contact.findByIdAndDelete(id);
