// src/typeorm/repositories/MusicRepository.ts

import { EntityRepository, Repository } from "typeorm";
import {Music} from "../entities/Music";

@EntityRepository(Music)
export default class MusicRepository extends Repository<Music> {

  public async findByTitulo(titulo: string): Promise<Music | undefined> {
    return this.findOne({ where: { titulo } });
  }

  public async findById(id: string): Promise<Music | undefined> {
    return this.findOne({ where: { id } });
  }

  public async findByCompositor(compositor: string): Promise<Music | undefined> {
    return this.findOne({ where: { compositor } });
  }

  public async findByAlbumId(albumId: string): Promise<Music[]> {
    return this.find({ where: { album: { id: albumId } } });
  }

  public async calcularDuracaoTotalDoAlbum(album_id: string): Promise<number> {
    const result = await this.createQueryBuilder("music")
      .select("SUM(music.duracao)", "total")
      .where("music.album_id = :album_id", { album_id })
      .getRawOne();

    return Number(result.total) || 0;
  }
}