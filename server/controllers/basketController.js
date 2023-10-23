import { basketService } from '../service/basket-service.js';

const maxAge = 60 * 60 * 1000 * 24 * 365;
const signed = true;

class BasketController {
  async getOne(req, res, next) {
    try {
      let basket;
      if (req.signedCookies.basketId) {
        basket = await basketService.getOne(
          parseInt(req.signedCookies.basketId)
        );
      } else {
        const { userId } = req.query;
        basket = await basketService.create(userId);
      }
      res.cookie('basketId', basket.id, { maxAge, signed });
      res.json(basket);
    } catch (error) {
      next(error);
    }
  }

  async append(req, res, next) {
    try {
      let basketId;
      if (!req.signedCookies.basketId) {
        const { userId } = req.query;
       
        const created = await basketService.create(userId);
        basketId = created.id;
      } else {
        basketId = parseInt(req.signedCookies.basketId);
      }
      const { prodactId, qty } = req.params;
      const basket = await basketService.append(basketId, prodactId, qty);
      res.cookie('basketId', basket.id, { maxAge, signed });
      res.json(basket);
    } catch (error) {
      next(error);
    }
  }

  async increment(req, res, next) {
    try {
      let basketId;
      if (!req.signedCookies.basketId) {
        const { userId } = req.query;
        const created = await basketService.create(userId);
        basketId = created.id;
      } else {
        basketId = parseInt(req.signedCookies.basketId);
      }
      const { prodactId, qty } = req.params;
      const basket = await basketService.increment(basketId, prodactId, qty);
      res.cookie('basketId', basket.id, { maxAge, signed });
      res.json(basket);
    } catch (error) {
      next(error);
    }
  }

  async decrement(req, res, next) {
    try {
      let basketId;
      if (!req.signedCookies.basketId) {
        const { userId } = req.query;
        const created = await basketService.create(userId);
        basketId = created.id;
      } else {
        basketId = parseInt(req.signedCookies.basketId);
      }
      const { prodactId, qty } = req.params;
      const basket = await basketService.decrement(basketId, prodactId, qty);
      res.cookie('basketId', basket.id, { maxAge, signed });
      res.json(basket);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      let basketId;
      if (!req.signedCookies.basketId) {
        const { userId } = req.query;
        const created = await basketService.create(userId);
        basketId = created.id;
      } else {
        basketId = parseInt(req.signedCookies.basketId);
      }
      const { prodactId } = req.params;
      const basket = await basketService.remove(basketId, prodactId);
      res.cookie('basketId', basket.id, { maxAge, signed });
      res.json(basket);
    } catch (error) {
      next(error);
    }
  }

  async clear(req, res, next) {
    try {
      let basketId;
      if (!req.signedCookies.basketId) {
        const { userId } = req.query;
        const created = await basketService.create(userId);
        basketId = created.id;
      } else {
        basketId = parseInt(req.signedCookies.basketId);
      }
      const basket = await basketService.clear(basketId);
      res.cookie('basketId', basket.id, { maxAge, signed });
      res.json(basket);
    } catch (error) {
      next(error);
    }
  }
}

export const basketController = new BasketController();
