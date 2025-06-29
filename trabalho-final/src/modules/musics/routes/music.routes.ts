import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/HTTP/middlewares/isAuthenticated";
import MusicController from "../controllers/MusicController";

const musicsRouter = Router();
const musicsController = new MusicController();

musicsRouter.use(isAuthenticated);

musicsRouter.get("/", async (req, res, next) => {
  try {
    await musicsController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

musicsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await musicsController.show(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

musicsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      duracao: Joi.number().min(0).required(),
      numero_faixa: Joi.number().min(1).required(),
      compositor: Joi.string().required(),
      letra: Joi.string().optional().default('A música ainda não possui uma letra').allow(''),
      album_id: Joi.string().uuid().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await musicsController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

musicsRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      titulo: Joi.string().required(),
      duracao: Joi.number().min(0).required(),
      numero_faixa: Joi.number().min(1).required(),
      compositor: Joi.string().required(),
      letra: Joi.string().optional().default('A música ainda não possui uma letra').allow(''),
      album_id: Joi.string().uuid().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await musicsController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

musicsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await musicsController.delete(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

export default musicsRouter;