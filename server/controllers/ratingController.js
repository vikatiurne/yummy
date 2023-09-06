import { Prodact, Rating } from '../models/models.js';

class RatingController {
  async create(req, res, next) {
    const { rating, prodactId, userId } = req.body;
    const ratingById = await Prodact.findOne({ where: { id: prodactId } });
    const qtyVotes = await Rating.findAll({ where: { prodactId } });
    console.log(qtyVotes.length);
    const updatedRating = ((ratingById.rating + rating) / 2).toFixed(1);
    const prodact = await Prodact.update(
      {
        rating: updatedRating,
      },
      { where: { id: prodactId } }
    );

    const data = await Rating.findOne({ where: { prodactId, userId } });
    data === null
      ? await Rating.create({ rate: rating, prodactId, userId })
      : console.log('Вашу оцінку цього товару вже враховано');
    //   : await Rating.destroy({ where: { prodactId, userId } });

    return res.json(prodact);
  }
  // async checkRating(req, res) {
  //   const { prodactId, userId } = req.query;
  //   const data = await Rating.findOne({ where: { prodactId, userId } });
  //   return res.json(data);
  // }
  async getRating(req, res, next) {
    try {
      const { userId } = req.query;
      const data = await Rating.findAll({ where: { userId } });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export const ratingController = new RatingController();
