import { getCustomRepository } from "typeorm";
import MusicRepository from "../typeorm/repositories/MusicRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string
}

export default class DeleteMusicService {
  public async execute(id: IRequest): Promise<void> {    
    const musicRepository = getCustomRepository(MusicRepository);

    const music = await musicRepository.findOne(id);

    if (!music) {
      throw new AppError("A música não existe");
    }

    await musicRepository.remove(music);
  }
}