import { Basket, BasketProdact, Prodact } from '../models/models.js';

class BasketService {
  async getOne(basketId, userId) {
    let basket = await Basket.findByPk(basketId, {
      include: [{ model: Prodact, attributes: ['id', 'name', 'price'] }],
      attributes: ['id'],
      where: { userId },
    });
    if (!basket) {
      basket = await Basket.create({ userId });
    }
    return basket;
  }

  async create(userId) {
    console.log(userId);
    return await Basket.create({ userId });
  }

  async append(basketId, prodactId, qty, userId) {
    let basket = await Basket.findByPk(basketId, {
      attributes: ['id'],
      include: [{ model: Prodact, attributes: ['id', 'name', 'price'] }],
      where: { userId },
    });
    if (!basket) {
      basket = await Basket.create({ userId });
    }
    const basketProdact = await BasketProdact.findOne({
      where: { basketId, prodactId },
    });
    if (basketProdact) {
      await basketProdact.increment('qty', { by: qty });
    } else {
      await BasketProdact.create({ basketId, prodactId, qty });
    }
    await basket.reload();
    return basket;
  }

  async increment(basketId, prodactId, qty, userId) {
    let basket = await Basket.findByPk(basketId, {
      include: [{ model: Prodact, as: 'prodacts' }],
      where: { userId },
    });
    if (!basket) {
      basket = await Basket.create({ userId });
    }
    const basketProdact = await BasketProdact.findOne({
      where: { basketId, prodactId },
    });
    if (basketProdact) {
      await basketProdact.increment('qty', { by: +qty });
      await basket.reload();
    }
    return basket;
  }

  async decrement(basketId, prodactId, qty, userId) {
    let basket = await Basket.findByPk(basketId, {
      include: [{ model: Prodact, as: 'prodacts' }],
      where: { userId },
    });
    if (!basket) {
      basket = await Basket.create({ userId });
    }
    const basketProdact = await BasketProdact.findOne({
      where: { basketId, prodactId },
    });
    if (basketProdact) {
      if (basketProdact.qty > qty) {
        await basketProdact.decrement();
      } else {
        await basketProdact.destroy();
      }
      await basket.reload();
    }
    return basket;
  }

  async remove(basketId, prodactId, userId) {
    let basket = await Basket.findByPk(basketId, {
      include: [{ model: Prodact, as: 'prodacts' }],
      where: { userId },
    });
    if (!basket) {
      basket = await Basket.create({ userId });
    }
    const basketProdact = await BasketProdact.findOne({
      where: { basketId, prodactId },
    });
    if (basketProdact) {
      await basketProdact.destroy();
      await basket.reload();
    }
    return basket;
  }

  async clear(basketId, userId) {
    let basket = await Basket.findByPk(basketId, {
      include: [{ model: Prodact, as: 'prodacts' }],
      where: { userId },
    });
    if (!basket) {
      basket = await Basket.create({ userId });
    } else {
      await BasketProdact.destroy({ where: { basketId } });
      await basket.reload();
    }
    return basket;
  }

  //   async delete(basketId){
  //     let basket = await Basket.findByPk(basketId, {
  //         include: [{model: Prodact, as: 'prodacts'}]
  //     })
  //     if(!basket){
  //         throw new Error('Корзина не знайдена у БД')
  //     }
  //     await basket.destroy()
  //     return basket
  //   }
}

export const basketService = new BasketService();
