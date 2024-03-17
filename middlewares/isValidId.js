import { isValidObjectId } from 'mongoose';
import HttpError from '../helpers/HttpError.js';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(400, `Id ${id} is invalid`));
  }
  next();
};

export default isValidId;
