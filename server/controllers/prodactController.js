import { v4 as uuidv4 } from 'uuid';
import path from 'path';

import { Prodact, ProdactInfo } from '../models/models.js';
import { ApiError } from '../error/apiError.js';

class ProdactController {
  async create(req, res, next) {
    try {
      const { name, price, categoryId, subcategoryId, sizes, info } = req.body;

      const { img } = req.files;
      let fileName = uuidv4() + '.jpg';
      const __dirname = path.dirname('..');
      img.mv(path.resolve(__dirname, 'static', fileName));

      const prodact = await Prodact.create({
        name,
        price,
        categoryId,
        subcategoryId,
        sizes,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((el) =>
          ProdactInfo.create({
            title: el.title,
            description: el.description,
            prodactId: prodact.id,
          })
        );
      }

      return res.json(prodact);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res) {
    let { categoryId, subcategoryId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 8;
    let offset = page * limit - limit;
    let prodacts;
    if (!categoryId && !subcategoryId) {
      prodacts = await Prodact.findAndCountAll({ limit, offset });
    }
    if (categoryId && !subcategoryId) {
      prodacts = await Prodact.findAndCountAll({
        where: { categoryId },
        limit,
        offset,
      });
    }
    if (!categoryId && subcategoryId) {
      prodacts = await Prodact.findAndCountAll({
        offset,
      });
    }
    if (categoryId && subcategoryId) {
      prodacts = await Prodact.findAndCountAll({
        where: { categoryId, subcategoryId },
        limit,
        offset,
      });
    }
    return res.json(prodacts);
  }
  async getOne(req, res) {
    const {id} = req.params
    const prodact = await Prodact.findOne({
      where:{id},
      include: [{model: ProdactInfo, as: 'info'}]
    })
    return res.json(prodact)
  }
}

export const prodactController = new ProdactController();
