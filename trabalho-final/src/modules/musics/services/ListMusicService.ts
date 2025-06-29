import { getCustomRepository } from "typeorm";
import MusicRepository from "../typeorm/repositories/MusicRepository";
import {Music} from "../typeorm/entities/Music";

export default class ListMusicService {
  public async execute(): Promise<Music[]> {
    const musicRepository = getCustomRepository(MusicRepository);

    const musics = await musicRepository.find();

    return musics;
  }
}
