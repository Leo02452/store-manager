const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    const { details } = error;
    error.message = details[0].message;
    switch (details[0].type) {
      case 'string.min':
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