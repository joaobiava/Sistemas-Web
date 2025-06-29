import { getCustomRepository } from "typeorm";
import Album from "../typeorm/entities/Album";
import AlbumRepository from "../typeorm/repositories/AlbumRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  nome: string;
  artista: string;
  ano_lancamento: Date;
  genero: string;
  duracao_total?: number;
}

export default class CreateAlbumService {
  public async execute({nome, artista, ano_lancamento, genero, duracao_total}: IRequest): Promise<Album> {    
    const albumRepository = getCustomRepository(AlbumRepository);

    const albumExist = await albumRepository.findByNome(nome);

    if (albumExist) {
      throw new AppError("Nome de album já cadastrado.");
    }

    const album = albumRepository.create({nome, artista, ano_lancamento, genero, duracao_total});

    await albumRepository.save(album);

    return album;
  }
}