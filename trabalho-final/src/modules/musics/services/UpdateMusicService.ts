import { getCustomRepository } from "typeorm";
import {Music} from "../typeorm/entities/Music";
import MusicRepository from "../typeorm/repositories/MusicRepository";
import AlbumRepository from "../../albums/typeorm/repositories/AlbumRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string
    titulo: string;
    duracao: number;
    numero_faixa: number;
    compositor: string;
    letra?: string;
    album_id: string;
}

export default class UpdateMusicService {
    public async execute({id, titulo, duracao, numero_faixa, compositor, letra, album_id}: IRequest): Promise<Music> {    
        const musicRepository = getCustomRepository(MusicRepository);
        const albumRepository = getCustomRepository(AlbumRepository);

        const music = await musicRepository.findById(id);

        if (!music) {
            throw new AppError("a música não existe")
        }

        const album = await albumRepository.findOne(album_id);
        if (!album) {
            throw new AppError("Álbum não encontrado.");
        }

        // Verifica se já existe uma música com o mesmo título no mesmo álbum (e ID diferente)
        const musicExist = await musicRepository.findOne({
            where: {
                titulo,
                album: { id: album_id },
            },
        });
        
        if(musicExist && musicExist.id !== id){
            throw new AppError("Já existe uma música com esse título neste álbum.");
        }

        music.titulo = titulo;
        music.duracao = duracao;
        music.numero_faixa = numero_faixa;
        music.compositor = compositor;
        if (letra !== undefined) {
            music.letra = letra;
        }
        music.album = album;

        await musicRepository.save(music);
        const novaDuracaoTotal = await musicRepository.calcularDuracaoTotalDoAlbum(album_id);
        album.duracao_total = novaDuracaoTotal;
        await albumRepository.save(album);

        return music;
    }
}