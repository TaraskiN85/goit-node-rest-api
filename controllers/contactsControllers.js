import HttpError from '../helpers/HttpError.js';
import * as contactsService from '../services/contactsServices.js';

export const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const contacts = await contactsService.listContacts(
      { owner },
      { skip, limit }
    );
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const contactId = req.params.id;
    const contact = await contactsService.getOneContact({
      _id: contactId,
      owner,
    });
    if (!contact) {
      throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const contactId = req.params.id;
    const result = await contactsService.removeOneContact({
      _id: contactId,
      owner,
    });
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await contactsService.addContact({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const { id } = req.params;
    const data = req.body;
    if (!Object.keys(data).length) {
      throw HttpError(400, 'Body must have at least one field');
    }
    const result = await contactsService.updateOneContact(
      {
        _id: id,
        owner,
      },
      data
    );
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const { id } = req.params;
    const favorite = req.body.favorite;
    const result = await contactsService.updateOneContact(
      {
        _id: id,
        owner,
      },
      { favorite }
    );
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
