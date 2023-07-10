import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { ApiError } from '../error/apiError.js';
import { User } from '../models/models.js';
import { mailService } from './mail-service.js';
import { tokenService } from './token-service.js';
import { UserDto } from '../dtos/user-dto.js';
import { where } from 'sequelize';

class UserService {
  async registration(email, password, next) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest(`Користувач з e-mail: ${email} вже існує`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.badRequest('Некоректне посилання активації');
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest(`Користувач ${email} не знайден`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest('Невірно вказаний пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
}

export const userService = new UserService();
