import { ApiError } from '../error/apiError.js';
import bcrypt from 'bcrypt'
import { User,Basket } from '../models/models.js';

class UserController {
  async registration(req, res, next) {
    const {email, password, role} = req.body
    if(!email || !password){
      return next(ApiError.badRequest('Не вказан e-mail або пароль'))
    }
  }
  async login(req, res) {}
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest('задайте ID'));
    }
    res.json(id);
  }
}

export const userController = new UserController();
