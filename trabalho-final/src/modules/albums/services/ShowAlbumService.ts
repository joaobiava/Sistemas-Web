import { getCustomRepository } from "typeorm";
import AlbumRepository from "../typeorm/repositories/AlbumRepository";
import AppError from "@shared/errors/AppError";
import Album from "../typeorm/entities/Album";

export default class ShowAlbumService {
  public async execute(id: string): Promise<Album> {
    const albumRepository = getCustomRepository(AlbumRepository);

    const album = await albumRepository.findOne(id, {
      relations: ["musics"], // <- carrega as músicas associadas
    });

    if (!album) {
      throw new AppError("Álbum não encontrado.");
    }

    return album;
  }
}
