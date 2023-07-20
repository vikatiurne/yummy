import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import sequelize from './bd.js';
import {
  User,
  Basket,
  Rating,
  BasketProdact,
  Prodact,
  ProdactInfo,
  Category,
  Subcategory,
} from './models/models.js';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({
  credentials:true,
  origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log('server start on port:' + PORT));
  } catch (error) {
    console.log(error);
  }
};
start();
