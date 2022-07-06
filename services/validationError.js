const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    error.message = error.details[0].message;
    switch (error.details[0].type) {
      case 'string.min':
      case 'number.min':
        error.code = 422;
        break;
      case 'any.required':
        error.code = 400;
        break;
      default:
        error.code = 500;
        break; 
    }
    throw error;
  }
  return value;
};

module.exports = { runSchema };