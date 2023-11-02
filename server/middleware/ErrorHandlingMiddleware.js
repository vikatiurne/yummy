import { ApiError } from '../error/apiError.js';

export default function errorHandler(err, req, res, next) {
  console.log(err);

  if (err instanceof ApiError) {
    return res
      .json({status:err.status, message: err.message, errors: err.errors });
  }
  return res.json('Невідома помилка');
} 
