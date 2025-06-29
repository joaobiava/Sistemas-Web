import { Request, Response, NextFunction } from "express";
import CreateMusicService from "../services/CreateMusicService";
import ListMusicService from "../services/ListMusicService";
import ShowMusicService from "../services/ShowMusicService";
import UpdateMusicService from "../services/UpdateMusicService";
import DeleteMusicService from "../services/DeleteMusicService";

export default class MusicController {
  public async index(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const listmusics = new ListMusicService();
      const musics = await listmusics.execute();
      return response.json(musics);
    } catch (err) {
      next(err);
    }
  }

  public async show(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const showMusic = new ShowMusicService();
      const music = await showMusic.execute(id);
      return response.json(music);
    } catch (err) {
      next(err);
    }
  }

  public async create(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const {titulo, duracao, numero_faixa, compositor, letra, album_id} = request.body;
      const createMusic = new CreateMusicService();
      const music = await createMusic.execute({titulo, duracao, numero_faixa, compositor, letra, album_id});
      return response.json(music);
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const {titulo, duracao, numero_faixa, compositor, letra, album_id} = request.body;
      const updateMusic = new UpdateMusicService();
      const music = await updateMusic.execute({id, titulo, duracao, numero_faixa, compositor, letra, album_id});
      return response.json(music);
    } catch (err) {
      next(err);
    }
  }

  public async delete(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const deleteMusic = new DeleteMusicService();
      await deleteMusic.execute({ id });
      return response.json([]);
    } catch (err) {
      next(err);
    }
  }
}