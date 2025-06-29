import { getCustomRepository } from "typeorm";
import AlbumRepository from "../typeorm/repositories/AlbumRepository";
import Album from "../typeorm/entities/Album";

export default class ListAlbumService {
  public async execute(): Promise<Album[]> {
    const albumRepository = getCustomRepository(AlbumRepository);

    const albums = await albumRepository.find();

    return albums;
  }
}
