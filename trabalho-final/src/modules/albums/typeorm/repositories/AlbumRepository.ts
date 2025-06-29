import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Album from "../entities/Album";


@EntityRepository(Album)
export default class AlbumRepository extends Repository<Album> {
  
  public async findByNome(nome: string): Promise<Album | undefined> {
    return this.findOne({ where: { nome } });
  }

  public async findById(id: string): Promise<Album | undefined> {
    return this.findOne({ where: { id } });
  }

  public async findByArtista(artista: string): Promise<Album | undefined> {
    return this.findOne({ where: { artista } });
  }
}