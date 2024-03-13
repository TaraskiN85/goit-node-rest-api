import HttpError from '../helpers/HttpError.js';
import * as contactsService from '../services/contactsServices.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const result = await contactsService.removeContact(contactId);
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await contactsService.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!Object.keys(data).length) {
      throw HttpError(400, 'Body must have at least one field');
    }
    const result = await contactsService.updateContact(id, data);
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
