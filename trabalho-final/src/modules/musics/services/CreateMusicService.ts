// src/services/CreateMusicService.ts

import { getCustomRepository } from "typeorm";
import {Music} from "../typeorm/entities/Music";
import MusicRepository from "../typeorm/repositories/MusicRepository";
import AlbumRepository from "../../albums/typeorm/repositories/AlbumRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  titulo: string;
  duracao: number;
  numero_faixa: number;
  compositor: string;
  letra?: string;
  album_id: string; // Relacionamento com álbum
}

export default class CreateMusicService {
  public async execute({titulo, duracao, numero_faixa, compositor, letra, album_id}: IRequest): Promise<Music> {

    const musicRepository = getCustomRepository(MusicRepository);
    const albumRepository = getCustomRepository(AlbumRepository);

    // Verifica se o álbum existe
    const album = await albumRepository.findOne(album_id);
    if (!album) {
      throw new AppError("Álbum não encontrado.");
    }

    // (Opcional) Verificar se música com mesmo título no mesmo álbum já existe
    const musicaExistente = await musicRepository.findOne({
      where: {
        titulo,
        album: { id: album_id }
      }
    });

    if (musicaExistente) {
      throw new AppError("Essa música já existe nesse álbum.");
    }

    const music = musicRepository.create({titulo, duracao, numero_faixa, compositor, letra, album});

    await musicRepository.save(music);

    const novaDuracaoTotal = await musicRepository.calcularDuracaoTotalDoAlbum(album_id);
    album.duracao_total = novaDuracaoTotal;
    await albumRepository.save(album);

    return music;
  }
}
