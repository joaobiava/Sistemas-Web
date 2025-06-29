import { getCustomRepository } from "typeorm";
import Album from "../typeorm/entities/Album";
import AlbumRepository from "../typeorm/repositories/AlbumRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string
    nome: string;
    artista: string;
    ano_lancamento: Date;
    genero: string;
}

export default class UpdateAlbumService {
    public async execute({id, nome, artista, ano_lancamento, genero}: IRequest): Promise<Album> {    
        const albumRepository = getCustomRepository(AlbumRepository);

        const album = await albumRepository.findById(id);

        if (!album) {
            throw new AppError("o album não existe")
        }
        
        const albumExist = await albumRepository.findByNome(nome)
        if(albumExist && nome !== album.nome){
            throw new AppError("já existe um album cadastrado com este mesmo nome!")
        }
        album.nome = nome;
        album.artista = artista;
        album.ano_lancamento = ano_lancamento;
        album.genero = genero;

        await albumRepository.save(album);

        return album;
    }
}