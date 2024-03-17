export const saveContactError = (error, data, next) => {
  error.status = 400;
  next();
};

export const handleUpdateContact = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
