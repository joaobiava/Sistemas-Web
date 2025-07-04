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
      titulo: Joi.string().required().min(2).max(100),
      duracao: Joi.number().min(1).max(3600).required(),
      numero_faixa: Joi.number().min(1).required().max(100),
      compositor: Joi.string().required().min(2).max(100),
      letra: Joi.string().optional().default('A música ainda não possui uma letra').allow('').max(5000),
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
      titulo: Joi.string().required().min(2).max(100),
      duracao: Joi.number().min(1).max(3600).required(),
      numero_faixa: Joi.number().min(1).required().max(100),
      compositor: Joi.string().required().min(3).max(100),
      letra: Joi.string().optional().default('A música ainda não possui uma letra').allow('').max(5000),
      album_id: Joi.string().uuid().optional(),
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