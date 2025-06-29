import {Music} from "@modules/musics/typeorm/entities/Music";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('albums')

export default class Album{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    nome!: string;

    @Column()
    artista!: string;

    @Column()
    ano_lancamento!: Date;

    @Column()
    genero!: string;

    @Column('int')
    duracao_total!: number;

    @OneToMany(() => Music, music => music.album, { cascade: true })
    musics: Music[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}