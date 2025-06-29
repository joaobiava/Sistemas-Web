import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/HTTP/middlewares/isAuthenticated";
import AlbumController from "../controllers/AlbumController";

const albumsRouter = Router();
const albumsController = new AlbumController();

albumsRouter.use(isAuthenticated);

albumsRouter.get("/", async (req, res, next) => {
  try {
    await albumsController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

albumsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await albumsController.show(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

albumsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      artista: Joi.string().required(),
      ano_lancamento: Joi.date().required(),
      genero: Joi.string().required(),
      duracao_total: Joi.number().optional().default(0),
    },
  }),
  async (req, res, next) => {
    console.log("chegou aqui mano")
    try {
      await albumsController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

albumsRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      artista: Joi.string().required(),
      ano_lancamento: Joi.date().required(),
      genero: Joi.string().required(),
      duracao_total: Joi.number().optional().default(0),
    },
  }),
  async (req, res, next) => {
    try {
      await albumsController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

albumsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await albumsController.delete(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

export default albumsRouter;