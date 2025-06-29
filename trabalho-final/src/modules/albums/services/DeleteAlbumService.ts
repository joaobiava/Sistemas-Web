import { getCustomRepository } from "typeorm";
import AlbumRepository from "../typeorm/repositories/AlbumRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string
}

export default class DeleteAlbumService {
  public async execute(id: IRequest): Promise<void> {    
    const albumRepository = getCustomRepository(AlbumRepository);

    const album = await albumRepository.findOne(id);

    if (!album) {
      throw new AppError("O album não existe");
    }

    await albumRepository.remove(album);
  }
}