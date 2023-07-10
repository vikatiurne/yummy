// import { ApiError } from '../error/apiError.js';
import { ApiError } from '../error/apiError.js';
import { User, Basket } from '../models/models.js';
import { userService } from '../service/user-service.js';

// class UserController {
//   async registration(req, res, next) {
//     const {email, password, role} = req.body
//     if(!email || !password){
//       return next(ApiError.badRequest('Не вказан e-mail або пароль'))
//     }
//   }
//   async login(req, res) {}
//   async check(req, res, next) {
//     const { id } = req.query;
//     if (!id) {
//       return next(ApiError.badRequest('задайте ID'));
//     }
//     res.json(id);
//   }
// }
class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }
  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {
      next(error)
    }
  }
  async getUsers(req, res, next) {
    const {id} = req.query
    if(!id){
      return next(ApiError.badRequest('нет id'))
    }
    return res.json(id)
    // try {
    //   res.json(['123', '567']);
    // } catch (error) {}
  }
}

export const userController = new UserController();
