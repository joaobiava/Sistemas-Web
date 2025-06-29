import { Request, Response, NextFunction } from "express";
import CreateAlbumService from "../services/CreateAlbumService";
import ShowAlbumService from "../services/ShowAlbumService";
import ListAlbumService from "../services/ListAlbumService";
import UpdateAlbumService from "../services/UpdateAlbumService";
import DeleteAlbumService from "../services/DeleteAlbumService";

export default class AlbumController {
  public async index(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const listAlbums = new ListAlbumService();
      const albums = await listAlbums.execute();
      return response.json(albums);
    } catch (err) {
      next(err);
    }
  }

  public async show(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const showAlbum = new ShowAlbumService();
      const album = await showAlbum.execute(id);
      return response.json(album);
    } catch (err) {
      next(err);
    }
  }

  public async create(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const {nome, artista, ano_lancamento, genero, duracao_total} = request.body;
      const createAlbum = new CreateAlbumService();
      const album = await createAlbum.execute({nome, artista, ano_lancamento, genero, duracao_total});
      return response.json(album);
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const { nome, artista, ano_lancamento, genero } = request.body;
      const updateAlbum = new UpdateAlbumService();
      const album = await updateAlbum.execute({id, nome, artista, ano_lancamento, genero});
      return response.json(album);
    } catch (err) {
      next(err);
    }
  }

  public async delete(request: Request,response: Response,next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const deleteAlbum = new DeleteAlbumService();
      await deleteAlbum.execute({ id });
      return response.json([]);
    } catch (err) {
      next(err);
    }
  }
}