// src/typeorm/entities/Musica.ts
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import Album from "@modules/albums/typeorm/entities/Album";

@Entity('musics')
export class Music {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    titulo: string;

    @Column({ type: "int" })
    duracao: number;

    @Column()
    numero_faixa: number;

    @Column()
    compositor: string;

    @Column({ type: "text", nullable: true })
    letra: string;

    @ManyToOne(() => Album, album => album.musics)
    @JoinColumn({ name: "album_id" }) // <-- isso aqui corrige
    album: Album;
}
