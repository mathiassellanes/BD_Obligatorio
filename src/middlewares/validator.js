import { z } from 'zod';

const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map(err => ({
          path: err.path,
          message: err.message
        }))
      });
    }
    next(error);
  }
};

export default validateSchema;
