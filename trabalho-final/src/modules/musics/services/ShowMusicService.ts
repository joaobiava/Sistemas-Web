import { getCustomRepository } from "typeorm";
import MusicRepository from "../typeorm/repositories/MusicRepository";
import AppError from "@shared/errors/AppError";
import {Music} from "../typeorm/entities/Music";

export default class ShowMusicService {
  public async execute(id: string): Promise<Music> {
    const musicRepository = getCustomRepository(MusicRepository);

    const music = await musicRepository.findOne(id);

    if (!music) {
      throw new AppError("Música não encontrada.");
    }

    return music;
  }
}
